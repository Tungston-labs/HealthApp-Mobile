import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },

  header: {
    backgroundColor: '#F40404',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  content: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    alignItems: 'center',
  },

  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#444444',
    textAlign: 'center',
    marginBottom: 14,
  },

  bulletBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  bulletText: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#666666',
    textAlign: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },

  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  cancelText: {
    color: '#555555',
    fontSize: 15,
    fontWeight: '600',
  },

  acceptBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F40404',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  acceptText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
