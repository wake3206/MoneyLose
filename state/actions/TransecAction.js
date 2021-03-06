import {
    setTransData,
    setTransError,
    setTransLoading
} from "../reducers/TransecReducer";
import moment from "moment";


export const SaveTrans = (val, refDatas) =>{

    //console.log('---refDatas:', refDatas);

    return async (dispatch) =>{

        const index = refDatas.findIndex( i => {
            return moment(i.title.name).format('yyyyMMDD') == moment().format('yyyyMMDD')
        });

        console.log('---index', index);

        let newData = []
        if(index >= 0){

            let jsonTxt = JSON.stringify(refDatas);
            let jsonObj = JSON.parse(jsonTxt)

            newData = [...jsonObj]
            newData[index].data.push(val)
            
        }else{

            newData = [ {
                title: { name: moment(), summary: 0 },
                data: [
                    val
                ]
            }]
        }

        //console.log('---newData:', newData);

        const sortMock = newData
        .map((v) => ({ ...v, data: v.data.sort((a, b) => (a.direct > b.direct) ? 1 : -1) }))
        .map((v) => ({ ...v, title:{...v.title, summary: v.data.reduce((a, c) => parseInt(a,10) + parseInt(c.amt,10),0)  }}))
        .sort((a, b) => (moment(a.title.name).isBefore(b.title.name)) ? 1 : -1);
        dispatch(setTransData(sortMock));

    }
}

export const getTransecList = () => {

    return async (dispatch) => {

        try {

            const mock = [
                {
                    title: { name: moment(), summary: 0 },
                    data: [
                        { typeName: 'food', direct: 2, amt: -200, desc: 'ซื้อข้าวกลางวัน' },
                        { typeName: 'shopping', direct: 2, amt: -500, desc: 'ค่าขนม' },
                        { typeName: 'bill', direct: 2, amt: -5000, desc: 'จ่ายค่าไฟ' },
                        { typeName: 'bill', direct: 2, amt: -400, desc: 'จ่ายค่าน้ำ' },
                        { typeName: 'home', direct: 2, amt: -400, desc: 'ค่าบ้าน' },
                        { typeName: 'entertainment', direct: 2, amt: -400, desc: 'entertainment' },
                        { typeName: 'salary', direct: 1, amt: 400, desc: 'เงินเดือน' }
                    ]
                },
                {
                    title: { name: moment().subtract(1, 'day'), summary: 0 },
                    data: [
                        { typeName: 'food', direct: 2, amt: -200, desc: 'ซื้อข้าวกลางวัน' },
                        { typeName: 'food', direct: 2, amt: -500, desc: 'ค่าขนม' },
                        { typeName: 'bill', direct: 2, amt: -5000, desc: 'จ่ายค่าไฟ' },
                        { typeName: 'food', direct: 2, amt: -400, desc: 'จ่ายค่าน้ำ' },
                        { typeName: 'salary', direct: 1, amt: 40000, desc: 'เงินเดือน' }
                    ]
                },
                {
                    title: { name: moment().subtract(2, 'day'), summary: 0 },
                    data: [
                        { typeName: 'food', direct: 2, amt: -200, desc: 'ซื้อข้าวกลางวัน' },
                        { typeName: 'food', direct: 2, amt: -500, desc: 'ค่าขนม' },
                        { typeName: 'bill', direct: 2, amt: -5000, desc: 'จ่ายค่าไฟ' },
                        { typeName: 'food', direct: 2, amt: -400, desc: 'จ่ายค่าน้ำ' },
                        { typeName: 'salary', direct: 1, amt: 400, desc: 'เงินเดือน' }
                    ]
                }
            ];

            const sortMock = mock
                .map((v) => ({ ...v, data: v.data.sort((a, b) => (a.direct > b.direct) ? 1 : -1) }))
                .map((v) => ({ ...v, title:{...v.title, summary: v.data.reduce((a, c) => a + c.amt,0)  }}))
                .sort((a, b) => (moment(a.title.name).isBefore(b.title.name)) ? 1 : -1);

            dispatch(setTransLoading(true));
            setTimeout(() => {
                dispatch(setTransData(sortMock));
                dispatch(setTransLoading(false));
            }, 500);

        }
        catch (error) {
            dispatch(setTransError(error));
        }
    }
}