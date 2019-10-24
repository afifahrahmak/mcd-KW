function numberFormat(value){
    return value.toLocaleString('de-DE',{style : 'currency' , currency : 'IDR'})
}

module.exports = numberFormat