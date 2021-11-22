var card;
var flower = ['黑桃','紅心','菱形','梅花']
var existcard = [];
var clientcard = [];
var servercard = [];
var ClientPoint = 0;
var HostPoint = 0;
var judge_repeat;

function GenCard(buffer){
    if (buffer === 1){
        judge_repeat = true;
        while (judge_repeat){
            card = Math.floor(Math.random()*52);
            judge_repeat = false;
            for(var i=0;i<existcard.length;i++){
                if(existcard[i]===card){
                    judge_repeat = true;
                    break;
                }        
            }
        }
        existcard.push(card); 
        clientcard.push(card);   
        console.log("generate card: ",flower[Math.floor(card/13)],'  ',card%13+1);
        return clientcard;
    }
    if (buffer === 2){
        judge_repeat = true;
        while (judge_repeat){
            card = Math.floor(Math.random()*52);
            judge_repeat = false;
            for(var i=0;i<existcard.length;i++){
                if(existcard[i]===card){
                    judge_repeat = true;
                    break;
                }        
            }
        }
        existcard.push(card); 
        servercard.push(card);   
        console.log("server generate card: ",flower[Math.floor(card/13)],'  ',card%13+1);
        return servercard;
    }
}
function CalcPoint(buffer){
    if (buffer === 1){
        var Ace =0;
        ClientPoint =0;
        for(var i=0;i<clientcard.length;i++){
            if(clientcard[i]%13==0)
            Ace++;
            if(clientcard[i]%13+1>10)
                ClientPoint += 10
            else
                ClientPoint += clientcard[i]%13+1;
        }
        if (ClientPoint<21){
            if(Ace!==0)
            ClientPoint += 10;
        }


    }   
    if (buffer === 2){
        HostPoint = 0;
        for(var i=0;i<servercard.length;i++){
            if(servercard[i]%13+1>10)
                HostPoint += 10
            else
                HostPoint += servercard[i]%13+1;
        }
            


    }
}

function ServerGenCard(){
    CalcPoint(2);
    while(HostPoint<17){
        
        GenCard(2);
        CalcPoint(2);
    }
    return servercard;
}

function RunResult(){
    CalcPoint(1);
    CalcPoint(2);
    console.log(ClientPoint,HostPoint);
    if (ClientPoint>21) return 'lose'
    if (HostPoint>21) return 'win'
    if (ClientPoint>HostPoint) return 'win'
    return 'lose'
}

function restart(){
    card = [];
    clientcard = [];
    existcard = [];
    servercard = [];
    ClientPoint = 0;
    HostPoint = 0;
    judge_repeat = true;
}

export {GenCard, CalcPoint,ServerGenCard,RunResult,restart}