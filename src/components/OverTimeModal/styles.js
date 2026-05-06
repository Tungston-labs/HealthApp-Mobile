import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 18,
    elevation: 6,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },

  modalText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },

  modalButton: {
    alignSelf: 'center',
    backgroundColor: '#EF0707',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  modalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
