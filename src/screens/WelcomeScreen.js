import { View, Text, SafeAreaView, Image, Touchable, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-around', backgroundColor: 'white' }}>
            <View style={{ alignContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: wp(10), color: '#3f3f3f' }}>Welcome</Text>
                <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: wp(4), color: '#3f3f3f' }}>The future is here, powered by AI</Text>
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={require('../../assets/images/welcome.png')} style={{ width: wp(75), height: wp(75) }} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ backgroundColor: '#14532a', padding: 15, marginHorizontal: 20, borderRadius: 12 }}>
                <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: wp(5), color: 'white' }}>Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}