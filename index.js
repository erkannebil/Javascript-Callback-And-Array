const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const finalMatch = fifaData.filter(match => match.Year === 2014 && match.Stage === "Final")[0];
const homeTeamName = finalMatch["Home Team Name"];
console.log("Evsahibi takım ismi:", homeTeamName);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const deplasmanMatch = fifaData.filter(match => match.Year === 2014 && match.Stage === "Final")[0];
const awayTeamName = deplasmanMatch["Away Team Name"];
console.log("Deplasman takım ismi:", awayTeamName);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const goals=fifaData.filter(match => match.Year === 2014 &&match.Stage === "Final")[0];
const homeTeamGoals = goals["Home Team Goals"];
console.log("Ev sahibi takım gol sayısı:", homeTeamGoals);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

 const goal=fifaData.filter(match => match.Year === 2014 &&match.Stage === "Final")[0];
const awayTeamGoals = goal["Away Team Goals"];
console.log("Deplasman takım golleri:", awayTeamGoals);
//(e) 2014 Dünya kupası finali kazananı*/
let winner;
if (homeTeamGoals > awayTeamGoals) {
  winner = homeTeamName;
} else if (awayTeamGoals > homeTeamGoals) {
  winner = awayTeamName;
} else {
  winner = "Berabere";
}
console.log("Kazanan:", winner);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(dizi) {
	 const allFinalMatchs = dizi.filter(matchs => matchs.Stage === "Final")
	 return allFinalMatchs;
}


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

	function Yillar(dizi, Finaller) {
		const finalMatchData = Finaller(dizi);
		const years = finalMatchData.map(match => match.Year);
		return years;
	}
	
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

	function Kazananlar(dizi, Finaller) {
		const finalMatchData = Finaller(dizi);
		const kazananlar = [];
	
		for (let i = 0; i < finalMatchData.length; i++) {
			const match = finalMatchData[i];
			const homeTeamGoals = match["Home Team Goals"];
			const awayTeamGoals = match["Away Team Goals"];
	
			if (homeTeamGoals > awayTeamGoals) {
				kazananlar.push(match["Home Team Name"]);
			} else if (awayTeamGoals > homeTeamGoals) {
				kazananlar.push(match["Away Team Name"]);
			}
		}
	
		return kazananlar;
	}

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData, cb, cb2, cb3) {
	
    const finalMatches = cb(fifaData);	
    const years = cb2(finalMatches, cb);
    const winners = cb3(finalMatches, cb);

    const sentences = [];

    for (let i = 0; i < years.length; i++) {
        const year = years[i];
        const winner = winners[i];
        const sentence = `${year} yılında, ${winner} dünya kupasını kazandı!`;
        sentences.push(sentence);
    }
    return sentences;
}


/*  Görev 6: ????????????????????????????????????????????????????????????????*
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(fifaData) {

    const finalMatches = Finaller(fifaData);
	
    const totalGoals = finalMatches.reduce((acc, match) => {
        const homeGoals = match.HomeTeamGoals;
        const awayGoals = match.AwayTeamGoals;
        return acc + homeGoals + awayGoals;
    }, 0);
    const averageGoals = (totalGoals / finalMatches.length).toFixed(2);
    return parseInt(averageGoals);
}


/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data, takimKisaltmalari) {
    return data.reduce((kazanmaSayilari, match) => {
        const homeTeam = match.HomeTeam;
        const awayTeam = match.AwayTeam;
        
        if (match.Stage === 'Final' && match.Winner !== '') {
            const kazanan = match.Winner;
            
            if (!kazanmaSayilari[kazanan]) {
                kazanmaSayilari[kazanan] = 1;
            } else {
                kazanmaSayilari[kazanan]++;
            }
        }
        
        return kazanmaSayilari;
    }, {});
}

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
    const goalCounts = {};

    data.forEach((match) => {
        const homeTeam = match.HomeTeam;
        const awayTeam = match.AwayTeam;
        const homeGoals = match.HomeTeamGoals;
        const awayGoals = match.AwayTeamGoals;

        if (goalCounts[homeTeam]) {
            goalCounts[homeTeam] += homeGoals;
        } else {
            goalCounts[homeTeam] = homeGoals;
        }

        if (goalCounts[awayTeam]) {
            goalCounts[awayTeam] += awayGoals;
        } else {
            goalCounts[awayTeam] = awayGoals;
        }
    });

    const mostGoalsTeam = Object.keys(goalCounts).reduce((mostGoalsTeam, team) => {
        return goalCounts[team] > goalCounts[mostGoalsTeam] ? team : mostGoalsTeam;
    }, Object.keys(goalCounts)[0]);

    return mostGoalsTeam;
}



/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
    const goalCounts = {};

    data.forEach((match) => {
        const homeTeam = match.HomeTeam;
        const awayTeam = match.AwayTeam;
        const homeGoals = match.HomeTeamGoals;
        const awayGoals = match.AwayTeamGoals;

        if (goalCounts[homeTeam]) {
            goalCounts[homeTeam] += awayGoals;
        } else {
            goalCounts[homeTeam] = awayGoals;
        }

        if (goalCounts[awayTeam]) {
            goalCounts[awayTeam] += homeGoals;
        } else {
            goalCounts[awayTeam] = homeGoals;
        }
    });

    const worstDefenseTeam = Object.keys(goalCounts).reduce((worstDefenseTeam, team) => {
        return goalCounts[team] > goalCounts[worstDefenseTeam] ? team : worstDefenseTeam;
    }, Object.keys(goalCounts)[0]);

    return worstDefenseTeam;
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
