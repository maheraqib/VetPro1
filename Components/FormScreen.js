import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import validator from 'validator';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
// import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

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
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('');
  const [positionError, setPositionError] = useState('');
  const navigation = useNavigation();
  const [videoUri, setVideoUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoName, setVideoName] = useState('');

  const selectVideo = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.video],
      });
      setVideoUri(res.uri);
      setVideoName(res.name || 'Selected Video');
    } catch (error) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Use Cancel the Video Uploading Process');
      } else {
        console.error('Video error', err);
      }
    }
  };

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdoun = () => {
    if (visible) {
      const positions = ['Position1', 'Position2', 'Position3', 'Position4'];
      return (
        <View style={styles.dropdownContainer}>
          {positions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropDownItem}
              onPress={() => {
                setPosition(item);
                setVisible(false);
              }}>
              <Text style={styles.dropDownText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

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
    } else if (firstName.trim().length < 5) {
      setFirstNameError('First name must be at least 5 characters');
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
    if (!position || position.trim() === '') {
      setPositionError('Please select a position');
      valid = false;
    } else {
      setPositionError('');
    }

    return valid;
  };

  const handleNext = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Form is valid. You can proceed!');
      setActiveTab('Next');
      navigation.navigate('Home');
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
      {firstNameError ? (
        <Text style={{color: 'red'}}>{firstNameError}</Text>
      ) : null}

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
      {lastNameError ? (
        <Text style={{color: 'red'}}>{lastNameError}</Text>
      ) : null}

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
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Entypo name="briefcase" color="#bd33d4" size={24} />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Position*"
            editable={false}
            value={position}
          />
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.toggleContainer}>
            <Entypo name="chevron-down" color="#a855f7" size={24} />
          </TouchableOpacity>
        </View>
        {renderDropdoun()}
      </View>
      {positionError ? (
        <Text style={{color: 'red', marginLeft: 10}}>{positionError}</Text>
      ) : null}

      {/* About Me */}
      <View style={styles.aboutContainer}>
        <View style={styles.headingContainer}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>About Me</Text>
      <TouchableOpacity onPress={selectVideo} style={styles.uploadButton}>
        <Text style={styles.buttonText}>Upload Video</Text>
      </TouchableOpacity>
      </View>

      {videoUri && (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.previewBox}>
          <Text style={styles.videoName}>{videoName}</Text>
          <Text style={styles.playIcon}><FontAwesome name="play" color="#a855f7" size={24} /></Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Video
              source={{ uri: videoUri }}
              style={styles.video}
              controls={true}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Entypo name="cross" color="#a855f7" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    
        
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
    paddingHorizontal: 10,
  },
  iconContainer: {
    marginHorizontal: 10,
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
    borderWidth: 2,
  },
  activeTabButton: {
    backgroundColor: '#a678f2',
    borderColor: '#a678f2',
    borderWidth: 2,
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
    borderRadius: 25,
    padding: 4,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  toggleContainer: {
    paddingHorizontal: 6,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#bd33d4',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    marginHorizontal: 10,
    elevation: 3,
    marginBottom: 5,
  },
  dropDownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropDownText: {
    fontSize: 16,
    color: '#444',
  },
  uploadButton: {
    backgroundColor: '#a855f7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
  previewBox: {
    marginTop: 10,
    marginBottom:10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a855f7',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'space-between',
  },
  videoName: {
    flex: 1,
    color: '#a855f7',
    fontWeight: '500',
  },
  playIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 300,
  },
  closeButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#f3e8ff',
    borderRadius: 30,
  },
});
