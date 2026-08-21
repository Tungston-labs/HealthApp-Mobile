import { ErrorToast, SuccessToast, InfoToast } from 'react-native-toast-message';

export const toastConfig = {
  /* Overwrite the 'error' type */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ 
        borderLeftColor: '#FF0000',
        backgroundColor: '#FFEBEE', // Very light red background
        height: 70,
        width: '90%',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D32F2F', // Deep red text
      }}
      text2Style={{
        fontSize: 14,
        color: '#B71C1C'
      }}
    />
  ),
  
  success: (props) => (
    <SuccessToast
      {...props}
      style={{ 
        borderLeftColor: '#4CAF50', 
        backgroundColor: '#E8F5E9',
        height: 70,
        width: '90%',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ 
        fontSize: 16,
        color: '#2E7D32', 
        fontWeight: 'bold' 
      }}
      text2Style={{
        fontSize: 14,
        color: '#1B5E20'
      }}
    />
  ),

  info: (props) => (
    <InfoToast
      {...props}
      style={{ 
        borderLeftColor: '#2196F3', 
        backgroundColor: '#E3F2FD',
        height: 70,
        width: '90%',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ 
        fontSize: 16,
        color: '#0D47A1', 
        fontWeight: 'bold' 
      }}
      text2Style={{
        fontSize: 14,
        color: '#1565C0'
      }}
    />
  )
};