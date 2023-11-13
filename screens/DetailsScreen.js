import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    Image,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "react-native-paper";
import { fetchWeatherForecast } from "../api/Weather";
import { weatherImages } from "../constants";
import {styles} from "../styles/HomeStyle"

export default function DetailsScreen({ route }) {
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetchMyWeatherData();
    }, []);

    const fetchMyWeatherData = async () => {
    fetchWeatherForecast({
        cityName: route.params.data,
        days: "7",
    }).then((data) => {
        setWeather(data);
        setLoading(false);
    });
    };

    const { current, location } = weather;
    let time = location?.localtime.split(' ')[1]
    let a = null, b =1

    return (
    <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/background.png")}
    >
        {loading ? (
            <View style={styles.loading}>
                <Text style={styles.text}>Loading...</Text>
                <Avatar.Icon
                        style={styles.iconimg1}
                        icon="loading"
                        color="white"
                        size={70}
                    />        
            </View>
        ) : 
        (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={styles.forecastContainer}>
                    <View style={styles.forecast}>
                        {/* City Name */}
                        <Text style={styles.name}>
                            {location?.name}
                            <Text style={styles.subname}>{", " + location?.country}</Text>
                        </Text>
                        {/* Weather Image */}
                        <View style={styles.weatherContainer}>
                            <Image
                                style={styles.weatherimg}
                                source={weatherImages[current?.condition?.text]}
                            />
                            {/* degree celcius */}
                            <View style={styles.degcelcius}>
                                <Text style={styles.degree}>{current?.temp_c}&#176;</Text>
                                <Text style={styles.detail}>
                                    {current?.condition?.text}
                                </Text>
                            </View>
                                {/* other details */}
                            <View style={styles.more}>
                                <View style={styles.moredetail}>
                                    <Image
                                        style={styles.weathericon}
                                        source={require("../assets/wind.png")}
                                    />
                                    <Text style={styles.detail1}>{current?.wind_kph}km</Text>
                                </View>
                                <View style={styles.moredetail}>
                                    <Image
                                    style={styles.weathericon}
                                    source={require("../assets/drop.png")}
                                    />
                                    <Text style={styles.detail1}>{current?.humidity}%</Text>
                                </View>
                                <View style={styles.moredetail}>
                                    <Image
                                        style={styles.weathericon}
                                        source={require("../assets/sun(1).png")}
                                    />
                                    <Text style={styles.detail1}>{time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.weekdetail}>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ paddingHorizontal: 5 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {weather?.forecast?.forecastday?.map((item, index) => {
                            let date = new Date(item.date);
                            a = date;
                            let options = { weekday: "short" };
                            let dayName = date.toLocaleDateString("en-US", options);
                            dayName = dayName.split(",")[0];
                            return (
                                <View key={index} style={styles.daily}>
                                    <Image
                                        style={styles.dailyimg}
                                        source={weatherImages[item?.day?.condition?.text]}
                                    />
                                    <Text style={styles.detail1}>{dayName}</Text>
                                    <Text style={styles.subhead}>
                                    {item?.day?.avgtemp_c}&#176;
                                    </Text>
                                    
                                </View>
                            );
                        })}
                        {weather?.forecast?.forecastday?.map((item, index) => {
                            let date = new Date(a);
                            date.setDate(date.getDate()+b)
                            let options = { weekday: "short" };
                            let dayName = date.toLocaleDateString("en-US", options);
                            dayName = dayName.split(",")[0];
                            b = b+1;
                            return (
                                <View key={index} style={styles.daily}>
                                    <Image
                                        style={styles.dailyimg}
                                        source={weatherImages[item?.day?.condition?.text]}
                                    />
                                    <Text style={styles.detail1}>{dayName}</Text>
                                    <Text style={styles.subhead}>{item?.day?.avgtemp_c}&#176;</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
                <StatusBar style="light" />
            </View>
        </SafeAreaView>
        )}
    </ImageBackground>
    );
}