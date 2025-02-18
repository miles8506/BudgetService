import { expect, test } from "@jest/globals";
import dayjs from 'dayjs'
import axios from 'axios'
import { jest } from "@jest/globals";
import Big from 'big.js';

interface IBudget {
  amount: number;
  yearMonth: string;
}

const res: IBudget[] = [{
  amount: 30000,
  yearMonth: '202501'
},{
  amount: 20000,
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
  query(start: string, end: string) {
    return budgetRepo.GetAll().then(() => {
      const _diffDate = dayjs(end).diff(dayjs(start), 'day') + 1
      let currentDate = dayjs(start);
      let count = 0;

      for (let i = 0; i < _diffDate; i++) {
        const yearMonth = currentDate.format('YYYYMM')
        const matchedData = res.find(item => item.yearMonth === yearMonth)
        currentDate = currentDate.add(1, 'day')
        const daysInMonth = dayjs(matchedData?.yearMonth).daysInMonth()
        count += Number(new Big(matchedData?.amount ?? 0).div(daysInMonth))
      }

      return count
    })
  }
}

const budgetService = new BudgetService()

budgetService.query('2025-01-01', '2025-01-31').then((res) => {
  console.log(res);
});

// test('the data is peanut butter', () => {
//   return budgetService.query('2025-01-01', '2025-01-01').then(({ data, diffDate }) => {
    
//   });
// });

