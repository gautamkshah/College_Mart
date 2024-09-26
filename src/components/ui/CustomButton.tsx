import { Colors } from "@utils/Constants"
import { FC } from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native"
import CustomText from "./CustomText"


interface CustomButtonProps {
    onPress: () => void,
    title: string,
    disabled?: boolean,
    loading?: boolean
}


const CustomButton: FC<CustomButtonProps> = ({ onPress, title, disabled, loading }) => {
    return (
        <TouchableOpacity style={[styles.btn,{
            backgroundColor: disabled ? Colors.disabled : Colors.secondary
        }]} onPress={onPress} disabled={disabled} activeOpacity={0.8} >
            {
                loading ? <ActivityIndicator size="small" color="#fff" /> :<CustomText  variant="h6" style={styles.text}>{title}</CustomText>
            }

        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        padding: 15,
        marginVertical: 15,
        width: '100%'
    },
    text: {
        color: '#fff'
    }
})


export default CustomButton