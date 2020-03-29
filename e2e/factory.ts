interface ITestCase {
    step1: number,
    step2: number,
    step3: number
}
export class TestFactory {
    private _testTree: ITestCase[]=[];
    private _possibleSenario: ITestCase;
    private _totalTestCount: number = 1;
    constructor() {
        this._possibleSenario = {
            step1: 2,
            step2: 4,
            step3: 3
        };
        this._calcTotalTestCase();
        this._generateTestTree();
    }
    private _calcTotalTestCase() {
        Object.keys(this._possibleSenario).forEach(key => {
            this._totalTestCount = this._possibleSenario[key] * this._totalTestCount
        })
    }
    private _generateTestTree(){
        let step1_index:number=0;
        let step2_index:number=0;
        let step3_index:number=0;
        let base =<ITestCase>{
            step1:step1_index,
            step2:step2_index,
            step3:step3_index
        };
        this._testTree.push(base);
        while(this._testTree.length<this._totalTestCount){
            step3_index++;
            if(step3_index==this._possibleSenario.step3){
                step3_index=0;
                step2_index++;
                if(step2_index==this._possibleSenario.step2){
                    step2_index=0;
                    step1_index++;
                    if(step1_index==this._possibleSenario.step1){
                        // test tree complete
                    }else{
                        this._testTree.push(base);
                    }
                }else{
                    this._testTree.push(base);
                }
            }else{
                this._testTree.push(base)
            }
        }    
        console.log(JSON.stringify(this._testTree));
    }
}