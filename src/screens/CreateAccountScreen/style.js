import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  formCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -22,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 6,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  backIconButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginLeft: -4,
  },

  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#181818',
  },

  heroSubtitle: {
    fontSize: 14,
    color: '#383838',
    marginBottom: 18,
  },

  profileSection: {
    alignItems: 'center',
    marginBottom: 18,
  },

  profileButton: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#EEF1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImage: {
    width: 74,
    height: 74,
    borderRadius: 37,
  },

  fieldGroup: {
    marginBottom: 12,
    position: 'relative',
  },

  fieldGroupRaised: {
    zIndex: 20,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#404040',
    marginBottom: 7,
  },

  inputBox: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#E7E1DD',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },

  inputBoxRow: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#E7E1DD',
    borderRadius: 8,
    paddingLeft: 14,
    paddingRight: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputControl: {
    flex: 1,
    fontSize: 15,
    color: '#161616',
    paddingVertical: 10,
  },

  rowInputControl: {
    flex: 1,
    fontSize: 15,
    color: '#161616',
    paddingVertical: 10,
  },

  inputDisplayText: {
    fontSize: 15,
    color: '#C9C5C2',
  },

  inputDisplayTextActive: {
    color: '#161616',
  },

  trailingIconButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  helperSuccessText: {
    marginTop: 6,
    fontSize: 12,
    color: '#6E68F5',
  },

  selectBox: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#E7E1DD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectText: {
    flex: 1,
    fontSize: 15,
    color: '#C9C5C2',
    paddingVertical: 10,
  },

  selectTextActive: {
    color: '#161616',
  },

  dropdownList: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E7E1DD',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },

  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EBE7',
  },

  dropdownItemText: {
    fontSize: 14,
    color: '#1E1E1E',
  },

  multilineBox: {
    minHeight: 72,
    paddingTop: 0,
  },

  multilineInputControl: {
    minHeight: 72,
    paddingTop: 12,
  },

  locationButton: {
    backgroundColor: '#D24667',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 6,
  },

  locationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
    marginBottom: 28,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CFC9C6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
    backgroundColor: '#FFFFFF',
  },

  checkboxChecked: {
    backgroundColor: '#6E68F5',
    borderColor: '#6E68F5',
  },

  termsText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#9E9996',
  },

  linkText: {
    color: '#9E9996',
    textDecorationLine: 'underline',
  },

  uploadWrapper: {
    marginTop: 8,
  },

  uploadTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#404040',
    marginBottom: 12,
  },

  uploadDropZone: {
    height: 160,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BAB4B1',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  uploadDropText: {
    fontSize: 15,
    color: '#474747',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },

  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 22,
  },

  footerActionsSingle: {
    justifyContent: 'flex-end',
  },

  secondaryAction: {
    flex: 1,
    minHeight: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  primaryAction: {
    minWidth: 140,
    minHeight: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 22,
  },

  submitAction: {
    backgroundColor: '#6E68F5',
  },

  disabledAction: {
    opacity: 0.7,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  secondaryActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#161616',
  },

  primaryActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  errorText: {
    color: '#D12F4E',
    textAlign: 'center',
    marginBottom: 6,
  },
});
