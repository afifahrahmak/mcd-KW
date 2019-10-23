function phoneNumber(phoneNumber){
  let phone = "62";
  for(let i = 0; i < phoneNumber.length; i++){
    if(i !== 0){
      phone+=phoneNumber[i];
    }
  }
  return phone;
}

module.exports = phoneNumber;