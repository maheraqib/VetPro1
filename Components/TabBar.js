import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Modal, TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function TabBar() {
  const [data, setData] = useState('[]');
  const [activeTab, setActiveTab] = useState('Reviews');
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

    const getDataFromAPI = async() => {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    let result = await fetch(url)
    result = await result.json();
    setData(result)
  }
  useEffect(() => {
    getDataFromAPI();
  }, [])
  
  const users = [
    {
      id: 1,
      name: 'Jonathan Randy',
      reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ratings: 3,
      image: 'https://picsum.photos/id/1/200/300',
    },

    {
      id: 2,
      name: 'Jonathan Randy',
      reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ratings: 4,
      image: 'https://picsum.photos/id/1/200/300',
    },

    {
      id: 3,
      name: 'Jonathan Randy',
      reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ratings: 5,
      image: 'https://picsum.photos/id/1/200/300',
    },

    {
      id: 4,
      name: 'Jonathan Randy',
      reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ratings: 2,
      image: 'https://picsum.photos/id/1/200/300',
    },

    {
      id: 5,
      name: 'Jonathan Randy',
      reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ratings: 3,
      image: 'https://picsum.photos/id/1/200/300',
    },
  ];
  const [allReviews, setAllReviews] = useState(users);

  const renderContent = ratings => {
    switch (activeTab) {
      case 'About':
        return (
          <View>
            <Text> API Data </Text>
          </View>
        );
      case 'Reviews':
        return (
          <View style={styles.reviewContainer}>
            {allReviews.map(item => (
              <View key={item.id} style={styles.reviewCard}>
                <View style={styles.profileNameContainer}>
                  <View style={styles.imageNameContainer}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.profileImage}
                    />
                    <Text style={styles.reviewerName}>{item.name}</Text>
                  </View>
                  <View style={styles.starsContaner}>
                    {[...Array(item.ratings)].map(stars => (
                      
                      <Entypo name="star" color="gold" size={18} />
                    ))}
                    {[...Array(5 - item.ratings)].map(stars => (
                      <Entypo name="star" color="gray" size={18} />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewText}>{item.reviews}</Text>
              </View>
            ))}
          </View>
        );
      case 'Jobs':
        return (
          <Text style={styles.contentText}>
            {/* {' '} */}
            Available jobs will be listed here.
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsBox}>
        {/* Tab Buttons */}
        <View style={styles.tabBar}>
          {['About', 'Reviews', 'Jobs'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
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

        <ScrollView style={styles.contentBox}>{renderContent()}</ScrollView>

        {activeTab === 'Reviews' && (
          <TouchableOpacity
            style={styles.writeReviewButton}
            onPress={() => setShowModal(true)}>
            <Text style={styles.writeReviewText}>Write A Review</Text>
          </TouchableOpacity>
        )}
        <Modal
          visible={showModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.buttonContainer}>
               <Text style={styles.modalTitle}>Write A Review</Text>
               <TouchableOpacity onPress={() =>setShowModal(false)}>
                <AntDesign name="close" color="#a678f2" size={24} />
               </TouchableOpacity>
              </View>
              
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Your Rating:</Text>
                <View style={styles.starRow}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setSelectedRating(star)}>
                      <Entypo
                        name="star"
                        size={30}
                        color={star <= selectedRating ? 'gold' : 'gray'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TextInput
                placeholder="Type your review..."
                value={reviewText}
                onChangeText={setReviewText}
                style={styles.modalInput}
                multiline
              />
              <TouchableOpacity
                onPress={() => {
                  if (reviewText && selectedRating > 0) {
                    const newReview = {
                      id: allReviews.length + 1,
                      name: 'You',
                      reviews: reviewText,
                      ratings: selectedRating,
                      image: 'https://picsum.photos/200', 
                    };
                    setAllReviews([newReview, ...allReviews]); 
                    setReviewText('');
                    setSelectedRating(0);
                    setShowModal(false);
                  } else {
                    alert('Please write a review and select a rating!');
                  }
                }}
                style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: '#fff',
    marginBottom: 50,
    flex: 1
  },

  detailsBox: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    // marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    color: '#666',
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f3eafe',
    borderRadius: 25,
    padding: 4,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#a678f2',
  },
  tabButtonText: {
    color: '#444',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  contentBox: {
    flex: 1,
    marginTop: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#444',
  },
  reviewContainer: {
    marginTop: 10,
  },
  reviewCard: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  profileNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageNameContainer: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 10,
  },
  starsContaner: {
    flexDirection: 'row',
  },

  reviewerName: {
    fontWeight: 'bold',
    marginBottom: 6,
    marginLeft: 5,
  },
  reviewText: {
    color: '#666',
  },
  writeReviewButton: {
    backgroundColor: '#a678f2',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 12,
  },
  writeReviewText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#a678f2',
    padding: 12,
    marginTop: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
  ratingContainer: {
    marginBottom: 12,
  },
  ratingLabel: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
  },
  starRow: {
    flexDirection: 'row',
  },
});
