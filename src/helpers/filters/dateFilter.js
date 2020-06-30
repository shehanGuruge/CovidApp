const diff1day = 1000*60*60*24;

export function filterByDate ({filter: _filter, isoDateTime: _isoDateTime})  {
    var isoDateToday = new Date(Date.now()).toISOString()
    var dateToday = new Date(isoDateToday);
    var diff = dateToday - new Date(_isoDateTime);
    console.log(diff/(diff1day * _filter))
    return (diff/(diff1day * _filter) <= _filter)
}