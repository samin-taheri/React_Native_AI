import { View, Image, SafeAreaView, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState, useRef } from 'react';
import Features from '../components/features';
import Voice from '@react-native-community/voice';
import { apiCall } from '../api/openAI';
import Tts from 'react-native-tts';

export default function HomeScreen() {
    const [messages, setMessages] = useState([]);
    const [recording, setRecording] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const ScrollViewRef = useRef();

    const speechStartHandler = (e) => {
        console.log('Speech Start handler');
    }
    const speechEndHandler = (e) => {
        setRecording(false);
        console.log('Speech End handler');
    }
    const speechResultsHandler = (e) => {
        console.log('Speech Result handler', e);
        const text = e.value[0];
        setResult(text);
    }
    const speechErrorHandler = (e) => {
        console.log('Speech Error handler', e);
    }
    const startRecording = async () => {
        setRecording(true);
        Tts.stop();
        try {
            await Voice.start('en-GB')
        } catch (e) {
            console.log(e);
        }
    }
    const stopRecording = async () => {
        try {
            await Voice.stop()
            setRecording(false)
            // fetch response
            fetchResponse();
        } catch (e) {
            console.log(e);
        }
    }
    const fetchResponse = async () => {
        if (result.trim().length > 0) {
            let newMessages = [...messages];
            newMessages.push({ role: 'user', content: result.trim() });
            setMessages([...newMessages]);

            // scroll to the bottom of the view
            updateScrollView();
            setLoading(true);
            // fetching response from chatGPT with our prompt and old messages
            apiCall(result.trim(), newMessages).then(res => {
                console.log('got api data');
                setLoading(false);
                if (res.success) {
                    setMessages([...res.data]);
                    setResult('');
                    updateScrollView();
                    // now play the response to user
                    startTextToSpeach(res.data[res.data.length - 1]);
                } else {
                    console.log('Error', res.msg);
                }

            })
        }
    }
    const updateScrollView = () => {
        setTimeout(() => {
            ScrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 200)
    }

    const startTextToSpeach = message => {
        if (!message.content.includes('https')) {
            setSpeaking(true);
            // playing response with the voice id and voice speed
            Tts.speak(message.content, {
                iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
                rate: 0.5,
            });
        }
    }


    const clear = () => {
        setMessages([]);
        Tts.stop();
    }
    const stopSpeaking = () => {
        setSpeaking(false);
    }

    useEffect(() => {
        // voice handler events
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        Voice.onSpeechError = speechErrorHandler;

        // tts 
        Tts.setDefaultLanguage('en-IE');
        Tts.addEventListener('tts-start', event => console.log('start', event));
        Tts.addEventListener('tts-finish', event => { console.log('finish', event); setSpeaking(false) });
        Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

        return () => {
            //destroy voice assistant
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, [])
    // console.log('results: ', result);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={require('../../assets/images/bot.png')} style={{ height: hp(15), width: hp(15) }} />
                </View>
                {messages.length > 0 ? (
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#3f3f3f', fontSize: wp(5), marginLeft: 5, fontWeight: '500' }}>Assistant</Text>
                        <View style={{ height: hp(58), backgroundColor: '#e8e8e8', borderRadius: 12, padding: 10, marginTop: 10 }}>
                            <ScrollView ref={ScrollViewRef} bounces={false} style={{}} showsVerticalScrollIndicator={false}>
                                {messages.map((message, index) => {
                                    if (message.role == 'assistant') {
                                        if (message.content.includes('https')) {
                                            //it is an Aı image
                                            return (
                                                <View key={index} style={{ justifyContent: 'flex-start', flexDirection: 'row', marginBottom: 10, height: wp(65), width: wp(65) }}>
                                                    <View style={{ flex: 1, backgroundColor: '#daf3e3', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTopRightRadius: 12, padding: 10 }}>
                                                        <Image source={{ uri: message.content }} style={{ borderRadius: 12, height: wp(60), width: wp(60) }} resizeMode='contain' />
                                                    </View>
                                                </View>
                                            )
                                        } else {
                                            //text response
                                            return (
                                                <View key={index} style={{ width: wp(70), backgroundColor: 'white', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTopRightRadius: 12, padding: 10, backgroundColor: '#daf3e3' }}>
                                                    <Text>{message.content}</Text>
                                                </View>
                                            )
                                        }
                                    } else {
                                        //user input
                                        return (
                                            <View key={index} style={{ justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                                                <View style={{ width: wp(70), backgroundColor: 'white', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTopLeftRadius: 12, padding: 10 }}>
                                                    <Text>{message.content}</Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                })}
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                    <Features />
                )}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {
                        loading ? (
                            <Image
                                source={require('../../assets/images/loading.gif')}
                                style={{ width: hp(10), height: hp(10) }}
                            />
                        ) :
                            recording ? (
                                // recording stop  button
                                <TouchableOpacity onPress={stopRecording}>
                                    <Image style={{ borderRadius: 50, width: hp(10), height: hp(10) }} source={require('../../assets/images/voiceLoading.gif')} />
                                </TouchableOpacity>
                            ) : (
                                // recording start button
                                <TouchableOpacity onPress={startRecording}>
                                    <Image style={{ borderRadius: 50, width: hp(10), height: hp(10) }} source={require('../../assets/images/recordingIcon.png')} />
                                </TouchableOpacity>
                            )
                    }
                    {messages.length > 0 && (
                        <TouchableOpacity onPress={clear} style={{ backgroundColor: '#a0a0a0', borderRadius: 25, padding: 12, position: 'absolute', right: 10 }}>
                            <Text style={{ color: 'white', fontWeight: '600' }}>Clear</Text>
                        </TouchableOpacity>
                    )}

                    {speaking && (
                        <TouchableOpacity onPress={stopSpeaking} style={{ backgroundColor: '#fa6969', borderRadius: 25, padding: 12, position: 'absolute', left: 10 }}>
                            <Text style={{ color: 'white', fontWeight: '600' }}>Stop</Text>
                        </TouchableOpacity>
                    )}

                </View>
            </SafeAreaView>
        </View>
    )
}