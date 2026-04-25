import router from 'express';
import expenseController from '../controllers/expense.controller.js';
import auth from '../middlewares/auth.middleware.js';

const expenseRouter=router();

expenseRouter.post('/add',auth,expenseController.addExpense);
expenseRouter.get('/get',auth,expenseController.getExpenses);
expenseRouter.delete('/delete/:id',auth,expenseController.deleteExpense);
expenseRouter.get('/data',auth,expenseController.getData);


export default expenseRouter;