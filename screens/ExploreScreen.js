import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "react-native-paper";
import {fetchWeatherForecast } from "../api/Weather";
import { weatherImages } from "../constants";

export default function ExploreScreen({navigation}){
    const [loading, setLoading] = useState(true);
    const [citiesArr, setCitiesArr] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setLoading(true);
        setTimeout(() => {
            setRefreshing(false);
            setLoading(false);
        }, 1000);
    }, []);
    

    useEffect(() => {
        fitchCities();
        onRefresh();
    }, []);

    const cities = 
    [   'Ulaanbaatar', 'Yellowknife',
        'Astana','Singapore', 'Yakutsk','Paris', 
        'Hong Kong','Beijing','New Delhi', 'Los Angeles', 
        'Shanghai', 'Tokyo', 'New York','London', 'Norilsk', 'Toyama'
    ]

    const fitchCities = async () =>{
        let citiesData = []
        cities.forEach(c =>{
            fetchWeatherForecast({
                cityName: c, 
                days: "7",
                }).then((data) => {
                    citiesData.push( {'location': data.location, 'current': data.current});
                }).catch((error)=>console.log(error))
            })
        setCitiesArr(citiesData);
        setLoading(false);
        console.log('DONE:',citiesArr);
    }

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
        )
        : 
        (
            <SafeAreaView style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.weekdetail}>
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            contentContainerStyle={{ paddingHorizontal: 5 }}
                            showsVerticalScrollIndicator={false}
                            style={styles.scroll} 
                        >   
                            {citiesArr.map((item, index) => {
                                return(
                                    <View key={index}>
                                        <TouchableOpacity
                                            onPress={()=> navigation.navigate('details',{ data: item.location.name })}
                                        >
                                            <View  style={styles.daily}>
                                                <Text style={styles.detail1}>{item.location.name}</Text>
                                                <Image
                                                    style={styles.dailyimg}
                                                    source={weatherImages[item.current.condition?.text]}
                                                    />
                                                <Text style={styles.detail1}>{item.current.temp_c}&#176;</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        )}
        <StatusBar style="light" />
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    loading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    text: {
        color: "#fff",
        fontSize: 30,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
    },
    main: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    subhead: {
        fontSize: 20,
        fontWeight: 600,
        color: "#fff",
    },
    search: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 60,
        borderRadius: 100,
        padding: 5,
        marginTop: 20,
        paddingRight: 5,
    },
    input: {
        color: "white",
        paddingLeft: 10,
        justifyContent: "flex-start",
    },
    icon: {
        color: "#fff",
        justifyContent: "flex-end",
    },
    iconimg: {
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
    searchActive: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    searchInactive: {
        backgroundColor: "transparent",
    },
    searchtxt: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        width: "88%",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        marginTop: 10,
        borderRadius: 20,
    },
    city: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
    },
    iconimg1: {
        color: "#c2c2c2",
        backgroundColor: "transparent",
    },
    cityname: {
        color: "white",
        fontSize: 17,
    },
    forecastContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 10,
    },
    weatherContainer: {
        flex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    },
    forecast: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    name: {
        fontSize: 24,
        color: "#fff",
        fontWeight: 500,
        marginTop: 20,
    },
    subname: {
        fontSize: 21,
    },
    weatherimg: {
        width: 145,
        height: 145,
        marginTop: 10,
    },
    degcelcius: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    degree: {
        color: "#fff",
        fontSize: 40,
        fontWeight: 700,
    },
    detail: {
        fontSize: 18,
        color: "#fff",
    },
    more: {
        display: "flex",
        flexDirection: "row",
    },
    moredetail: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
    },
    moredetail1: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    
    weathericon: {
        width: 25,
        height: 25,
    },
    detail1: {
        fontSize: 20,
        color: "#fff",
        fontWeight:'bold',
    },
    dailyimg: {
        width: 50,
        height: 50,
    },
    weekdetail: {
        width: "95%",
    },
    daily: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "rgba(255, 255, 255, 0.4)",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        marginTop:10,
        borderRadius: 20,
        marginRight: 10,
        gap: 20,
        justifyContent: "space-around",
        height:110,
        marginVertical:30,
    },
    scroll: {
        marginTop:20
    }
    });