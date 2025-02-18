import { expect, test } from "@jest/globals";
import dayjs from 'dayjs'
import Big from 'big.js';

interface IBudget {
  amount: number;
  yearMonth: string;
}

const res: IBudget[] = [{
  amount: 31000,
  yearMonth: '202501'
},{
  amount: 28000,
  yearMonth: '202502'
},{
  amount: 10000,
  yearMonth: '202503'
  }]

class BudgetRepo {
  GetAll(): Promise<IBudget[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res)
      }, 300);
    })
  }
}

const budgetRepo = new BudgetRepo()

class BudgetService {
  formatData(data: IBudget[]) {
    const map = new Map<string, IBudget>()

    for (const item of data) {
      map.set(item.yearMonth, item)
    }

    return map
  }

  getDifferenceDaysCount(start: string, end: string) {
    return dayjs(end).diff(dayjs(start), 'day') + 1
  }

  getCurrentDaysInMonth(date: string) {
    return dayjs(date).daysInMonth()
  }

  async query(start: string, end: string) {
    const res = await budgetRepo.GetAll()
    const data = this.formatData(res)
    const differenceDaysCount = this.getDifferenceDaysCount(start, end)
    let currentDate = dayjs(start)

    let count = 0;

    for (let i = 0; i < differenceDaysCount; i++) {
      const yearMonth = currentDate.format('YYYYMM')
      const matchedData = data.get(yearMonth)
      const currentDaysInMonth = this.getCurrentDaysInMonth(matchedData?.yearMonth ?? "")
      count += Number(new Big(matchedData?.amount ?? 0).div(currentDaysInMonth))
      currentDate = currentDate.add(1, 'day')
    }

    return count
  }
}

const budgetService = new BudgetService()

budgetService.query('2025-01-01', '2025-2-28').then((res) => {
  console.log(res);
});

// test('the data is peanut butter', () => {
//   return budgetService.query('2025-01-01', '2025-01-01').then(({ data, diffDate }) => {
    
//   });
// });
