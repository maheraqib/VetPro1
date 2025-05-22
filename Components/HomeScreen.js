import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TabBar from './TabBar';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
     <ImageBackground
        source={require('../Components/assets/Images/backgroundImage.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
            <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
              <AntDesign name="arrowleft" color="#fff" size={24} />
           </TouchableOpacity>
          <Text style={styles.imageText}> About Clinic </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>West Loop Veterinary Care</Text>
            <TouchableOpacity style={styles.buttonContainer}>
              <SimpleLineIcons name="share-alt" color="#bd33d4" size={20} />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addresContainer}>
            <Text style={styles.title}> Address: </Text>
            <Text style={styles.text}>
              {' '}
              1993 S Barnett Rd, Bisbee, AZ 85603, USA{' '}
            </Text>
          </View>

          <View style={styles.addresContainer}>
            <Text style={styles.title}> Team Size: </Text>
            <Text style={styles.text}> 10-20 </Text>
          </View>

          <View style={styles.addresContainer}>
            <Text style={styles.title}> Practice Type: </Text>
            <Text style={styles.text}> General Practice </Text>
          </View>

          <View style={styles.addresContainer}>
            <Text style={styles.title}> Specials: </Text>
            <Text style={styles.text}> Dog, Exotics, Large Animals </Text>
          </View>

          <View style={styles.addresContainer}>
            <Text style={styles.title}> Practice Management Software: </Text>
            <Text style={styles.text}> EzyVet </Text>
          </View>
        </View>
      </ImageBackground>

      <TabBar />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  backgroundImage: {
    height: 350,
    width: 393,
    flex: 1
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  imageText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 60,
  },
  detailsContainer: {
    padding: 10,
    marginRight: 35,
    marginTop: 130,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 30,
  },
  titleContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 100,
    // flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderColor: '#bd33d4',
    textAlign: 'center',
  },
  buttonText: {
    marginLeft: 3,
    color: '#bd33d4',
  },
  addresContainer: {
    // paddingLeft: 15,
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    fontWeight: '500',
  },
  text: {
    color: '#9090a5',
  },
  // addresContainerSoftware: {
  //   flexDirection: 'row',
  //   marginTop: 10,
  //   marginBottom: 50,
  // }
});
