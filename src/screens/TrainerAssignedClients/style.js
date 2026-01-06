import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
  },

  listWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  emptySubText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    lineHeight: 18,
  },
});
