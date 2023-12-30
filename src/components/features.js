import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';

export default function Features() {
    return (
        <View style={{ height: hp(60) }}>
            <Text style={{ fontSize: wp(6.5), fontWeight: '500', color: '#3f3f3f' }}>features</Text>
            <View style={{ backgroundColor: '#daf3e3', borderRadius: 12, padding: 15, top: 15, marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 2 }}>
                    <Image source={require('../../assets/images/chatgptIcon.png')} style={{ height: hp(4), width: hp(4) }} />
                    <Text style={{ fontSize: wp(4.8), fontWeight: '600', color: '#3f3f3f', paddingLeft: 14 }}>ChatGPT</Text>
                </View>
                <Text style={{ fontSize: wp(3.5), color: '#3f3f3f', padding: 5 }}>ChatGPT is a language model developed by OpenAI based on the GPT (Generative Pre-trained Transformer) architecture.</Text>
            </View>
            <View style={{ backgroundColor: '#ebdaf3', borderRadius: 12, padding: 15, top: 15, marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 2 }}>
                    <Image source={require('../../assets/images/dalleIcon.png')} style={{ height: hp(4), width: hp(4) }} />
                    <Text style={{ fontSize: wp(4.8), fontWeight: '600', color: '#3f3f3f', paddingLeft: 14 }}>DALL-E</Text>
                </View>
                <Text style={{ fontSize: wp(3.5), color: '#3f3f3f', padding: 5 }}>DALL-E is a generative model developed by OpenAI. It is a variation of the GPT architecture, specifically designed for image generation.</Text>
            </View>
            <View style={{ backgroundColor: '#daecf3', borderRadius: 12, padding: 15, top: 15, marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 2 }}>
                    <Image source={require('../../assets/images/smartaiIcon.png')} style={{ height: hp(4), width: hp(4) }} />
                    <Text style={{ fontSize: wp(4.8), fontWeight: '600', color: '#3f3f3f', paddingLeft: 14 }}>Smart AI</Text>
                </View>
                <Text style={{ fontSize: wp(3.5), color: '#3f3f3f', padding: 5 }}>"Smart AI" generally refers to artificial intelligence systems or technologies that exhibit advanced and intelligent behavior.</Text>
            </View>
        </View>
    )
}