import {View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Colors} from '@utils/Constants';
import {useAuthStorage} from '@state/authStorage';
import DeliveryHeader from './DeliveryHeader';
import TabBar from './TabBar';
import { fetchOrders } from '@service/orderService';

import CustomText from '@components/ui/CustomText';
import OrderItem from './OrderItem';
import { printNavigationStack } from '@utils/NavigationUtils';

const DeliveryDashboard = () => {
  const {user} = useAuthStorage();
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>('available');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData= async()=>{
    setData([])
    setRefreshing(true)
    setLoading(true)
    // console.log("Selected Tab",selectedTab)
    // console.log("User",user?._id)
    // console.log("Branch",user?.branch)
    const data =await fetchOrders(selectedTab,user?._id,user?.branch)
    
    setData(data)
    setLoading(false)
    setRefreshing(false)
  }

  const renderOrderItem=({item,index}: any)=>{
    return (
      <OrderItem index={index} item={item}/>
    )
  }


  useEffect(()=>{
    fetchData()
  },[selectedTab])



  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <DeliveryHeader name={user?.name} email={user?.email} />
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <FlatList
        data={data}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={
            async()=> await fetchData()
          }/>
          
        }
        ListEmptyComponent={()=>{
          if(loading){
            return(
              <View style={styles.center}>
                <ActivityIndicator color={Colors.secondary} size='small'/>
                </View>
            )
          }
          return (
            <View style={styles.center}>
              <CustomText>
                No Orders Found
              </CustomText>

            </View>
          )
        }}
        renderItem={renderOrderItem}
        keyExtractor={(item)=>item.orderId}
        contentContainerStyle={styles.flatlistContaier}

        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6,
  },
  flatlistContaier: {
    padding: 2,
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeliveryDashboard;
