import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#6C63FF',
    marginRight: 12,
  },

  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EDEDFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },

  time: {
    width: 48,
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginHorizontal: 10,
  },

  info: {
    flex: 1,
    gap:3
  },

  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },

  metaRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 30,
  },

  metaText: {
    fontSize: 12,
    color: '#666',
  },

  progressBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#D7DBFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },

  progressText: {
    fontSize: 11,
    color: '#6C63FF',
    fontWeight: '600',
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#7774F4',
    
  },

startBtnDisabled: {
  backgroundColor: '#BDBDBD',   
  opacity: 0.6,
},
  startText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
});
