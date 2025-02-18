import { expect, test } from "@jest/globals";
import dayjs from 'dayjs'
import axios from 'axios'
import { jest } from "@jest/globals";

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
  query(start: Date, end: Date) {
    return budgetRepo.GetAll().then(data => {
      
    })
  }
}

const budgetService = new BudgetService()

test('the data is peanut butter', () => {
  return budgetService.query(new Date(), new Date()).then(() => {
    // expect(data).toBe('peanut butter');
  });
});

