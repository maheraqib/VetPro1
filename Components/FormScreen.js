import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import validator from 'validator';
import { useNavigation } from '@react-navigation/native';



const FormScreen = () => {
  const [activeTab, setActiveTab] = useState('Next');
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigation = useNavigation();

  const validateEmail = () => {
    if (validator.isEmail(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Please enter a valid email');
      return false;
    }
  };

  const validateForm = () => {
    let valid = true;

    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      valid = false;
    } else if (firstName.trim().length < 5 ){
      setFirstNameError('First name must be at least 5 characters')
      valid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      valid = false;
    } else {
      setLastNameError('');
    }

    if (!validator.isEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validator.isMobilePhone(phone, 'any')) {
      setPhoneError('Please enter a valid phone number');
      valid = false;
    } else {
      setPhoneError('');
    }

    return valid;
  };

  const handleNext = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Form is valid. You can proceed!');
      setActiveTab('Next');
      navigation.navigate('Home')
    }
  };


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: '500'}}> Profile info </Text>

      {/* First Name */}
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <SimpleLineIcons name="user" color="#bd33d4" size={24} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="First Name*"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      {firstNameError ? <Text style={{color: 'red'}}>{firstNameError}</Text> : null}

      {/* Last Name */}
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <SimpleLineIcons name="user" color="#bd33d4" size={24} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Last Name*"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      {lastNameError ? <Text style={{color: 'red'}}>{lastNameError}</Text> : null}

      {/* Email */}
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Fontisto name="email" color="#bd33d4" size={24} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Email*"
          value={email}
          onChangeText={setEmail}
          onBlur={validateEmail}
        />
      </View>
      {emailError ? <Text style={{color: 'red'}}>{emailError}</Text> : null}

      {/* Phone */}
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="smartphone" color="#bd33d4" size={24} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Phone*"
          value={phone}
          onChangeText={setPhone}
          keyboardType={'phone-pad'}
        />
      </View>
      {phoneError ? <Text style={{color: 'red'}}>{phoneError}</Text> : null}

      {/* Location */}
      <View style={styles.inputContainer}>
  <View style={styles.iconContainer}>
    <Entypo name="location" color="#bd33d4" size={25} />
  </View>
  <TextInput
    style={styles.textInput}
    placeholder="Current Location*"
    editable={true}
  />
 
</View>
      {/* Position */}
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Entypo name="briefcase" color="#bd33d4" size={24} />
        </View>
        <TextInput style={styles.textInput} placeholder="Position*" />
      </View>

      {/* About Me */}
      <View style={styles.aboutContainer}>
        <View style={styles.headingContainer}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>About Me</Text>
          <TouchableOpacity>
            <Text style={styles.button}> Upload Video </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.aboutInput}>
          <TextInput
            style={styles.abouttextInput}
            placeholder="Tell us who you are"
            multiline
            numberOfLines={5}
          />
        </View>
        <Text style={styles.minWords}>Minimum 500 Words</Text>

        {/* Fun Fact */}
        <View style={{marginTop: 10}}>
          <View style={styles.headingContainer}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>
              Fun Fact About Me
            </Text>
          </View>
          <View style={styles.aboutInput}>
            <TextInput
              style={styles.abouttextInput}
              placeholder="Type here"
              multiline
              numberOfLines={5}
            />
          </View>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabBar}>
          {['Back', 'Next'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={tab === 'Next' ? handleNext : () => setActiveTab('Back')}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}>
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};


export default FormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#bd33d4',
    borderWidth: 1,
    marginVertical: 10,
  },
  iconContainer: {
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#a855f7',
    padding: 8,
    borderRadius: 25,
    color: 'white',
    fontSize: 15,
  },
  aboutInput: {
    marginTop: 5,
    elevation: 2,
    // borderColor: '#a855f7'
  },

  abouttextInput: {
    borderWidth: 1,
    borderColor: '#bd33d4',
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    elevation: 1,
    borderTopWidth: 0,
  },
  minWords: {
    fontSize: 12,
    color: '#f87171',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#f87171', 
    borderWidth: 2

  
  },
  activeTabButton: {
    backgroundColor: '#a678f2',
    borderColor: '#a678f2',
    borderWidth: 2
  },
  tabButtonText: {
    color: '#444',
    fontWeight: '600',
    borderRadius: 20,


  },
  activeTabText: {
    color: '#fff',
  },
  tabBar: {
  flexDirection: 'row',
    // backgroundColor: '#f3eafe',
    borderRadius: 25,
    padding: 4,
    marginVertical: 10,
    justifyContent: 'space-between',
}
});

