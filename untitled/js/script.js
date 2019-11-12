function addData(obj){

    firebase.database().ref().push(obj);

    alert("data saved");  //in real app you need to use firebase API to get this confirmation.
}

var jasonObj=
    [
        {
            "code":"088270221332",
            "name":"Rainer Cherry Soda",
            "price":1.09
        },
        {
            "code":"000420200004",
            "name":"Twix 3.02OZ",
            "price":1.29
        },
        {
            "code":"880607148868",
            "name":"SAMSUNG GALAXY s2",
            "price":678.23
        },
        {
            "code":"075944869020",
            "name":"Kenneth Cole Reaction FAST CASH XL SHOES",
            "price":242.22
        },
        {
            "code":"081380201850",
            "name":"NORDSTROM RACK ivory skirt small",
            "price":89.16
        },
        {
            "code":"088722379598",
            "name":"Nike shorts",
            "price":23.32
        },
        {
            "code":"003920897309",
            "name":"Brinks door lock",
            "price":19.44
        }
    ]
