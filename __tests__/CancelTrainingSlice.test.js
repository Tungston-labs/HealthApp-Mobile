import { cancelTrainingThunk } from '../src/redux/slices/CancelTrainingSlice';
import { ClientCancelTraining } from '../src/services/clientServices';

jest.mock('../src/services/clientServices', () => ({
  ClientCancelTraining: jest.fn(),
}));

describe('cancelTrainingThunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes the trainer_id payload to the cancel API', async () => {
    ClientCancelTraining.mockResolvedValue({ success: true });

    const dispatch = jest.fn();
    const thunk = cancelTrainingThunk({ trainer_id: 142 });
    const result = await thunk(dispatch, () => ({}), undefined);

    expect(ClientCancelTraining).toHaveBeenCalledWith({ trainer_id: 142 });
    expect(result.type).toBe('training/cancel/fulfilled');
  });
});
