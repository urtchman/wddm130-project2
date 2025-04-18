// src/controllers/currenciesController.js
const {Deposit, History, User, Wallet } = require('../../db/models'); // Sequelize User model
const swapCore = require("../swapCore");
const requestHandler = require("../requestHandler");
exports.createCurrency = (req, res) => {
    res.send('Currency added');
  };
  
  exports.getAllCurrencies = (req, res) => {
    res.send('All currencies');
  };
  
  exports.getCurrencyById = (req, res) => {
    const { id } = req.params;
    res.send(`Currency with ID: ${id}`);
  };
  
  exports.updateCurrency = (req, res) => {
    const { id } = req.params;
    res.send(`Update currency with ID: ${id}`);
  };
  
  exports.deleteCurrency = (req, res) => {
    const { id } = req.params;
    res.send(`Delete currency with ID: ${id}`);
  };
  
  exports.swapCurrency = async(req, res) => {// result:response.data.result, rate:response.data.info.quote
    const swapData = await requestHandler.convert(req.body.amount, 'NGN', req.body.currency);
    const currency = req.body.currency.toLowerCase();
    currency = currency=='eur'?'euro':currency;
    if(swapData.status=='success')
    {
      const user = await User.findOne({ where: { email: req.body.email } });
      if(user)
      {
        const wallet = await Wallet.findOne({where:{user_id: user.id}});
        const nAmount = wallet.naira;
        const hAmount = parseFloat(wallet[currency]) + parseFloat(swapData.result);
        const history = await History.create({
            user_id: user.id,
            amount_in_naira: req.body.amount,
            amount_received: swapData.result,
            currency: req.body.currency,
            rate: swapData.rate
        });

        

        res.status(200).json({ message: 'Naira swapped successfully', status:'success', data:{rate:swapData.rate, result:swapData.result} });
      }
      else{

      }
    }
  };
  
  exports.getExchangeRates = (req, res) => {
    res.send('Exchange rates');
  };
  
  exports.getSupportedCurrencies = (req, res) => {
    res.send('Supported currencies');
  };
  
  exports.startdeposit = async(req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if(user){
      const deposit = await Deposit.create({
        user_id: user.id,
        amount: req.body.amount,
        trans_ref: swapCore.generateDepositReference(user.id),
        status: 'pending',
      }); 
      if(deposit)
      {
        res.status(201).json({ message: 'Deposit initiated successfully', status:'success', data:{reference: deposit.trans_ref, deposit} });
      }
      else{
        res.status(500).json({ message: 'Deposit was not started', status:'failed'});
      }
    }else
    {
      res.status(500).json({ message: 'Deposit was not started', status:'failed'});
    }
  };
  exports.updatedeposit = async(req, res) => {
    const deposit = await Deposit.findOne({ where: { trans_ref: req.body.trans_ref } });
    if(deposit){
      if(deposit.status=="completed")
      {
        res.status(200).json({ message: 'Deposit already updated', status:'failed'});
      }
      else
      {
          const wallet = await Wallet.findOne({where:{user_id: deposit.user_id}}); 
          if(wallet)
          {
            await deposit.update({
              status:'completed'
            });
            const nAmount = wallet.naira + parseFloat(req.body.amount);
            await wallet.update({
              naira:nAmount
            });
            res.status(201).json({ message: 'Deposit completed', status:'success', data:{amount: nAmount} });
          }
          else{
            res.status(500).json({ message: 'Deposit was not updated', status:'failed'});
          }
      }
    }else
    {
      res.status(500).json({ message: 'Deposit was not updated', status:'failed'});
    }
  };
