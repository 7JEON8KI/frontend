const CHANGE_STATISTIC = "statistics/CHANGE_BANNER" as const;

export const changeStatistics = (diff: QuantityData[]) => ({
  type: CHANGE_STATISTIC,
  payload: diff,
});

type StatisticsAction = ReturnType<typeof changeStatistics>;

type StatisticsState = {
  data: QuantityData[];
};

interface QuantityData {
  dayOfWeek: string;
  totalQuantity: number;
  totalSales: number;
}

const initialState: StatisticsState = {
  data: [],
};

function statistics(state: StatisticsState = initialState, action: StatisticsAction): StatisticsState {
  switch (action.type) {
    case CHANGE_STATISTIC:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
}

export default statistics;
