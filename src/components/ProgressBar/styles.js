import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: '#7774F4',
    borderRadius: 16,
    paddingBlock: 15,
    paddingInline: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  progressContainer: {
    height: 5,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 12,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#777777',
    borderRadius: 5,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  startedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
  },
  endButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },

  endButtonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '400',
  },
});
