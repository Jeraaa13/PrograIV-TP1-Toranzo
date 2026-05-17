import { Component, signal, computed, inject, OnDestroy } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { SupabaseService } from '../../servicios/supabase';
import { Auth } from '../../servicios/auth';
import Swal from 'sweetalert2';

declare const YT: any;
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

@Component({
  selector: 'app-guitarhero',
  imports: [],
  templateUrl: './guitarhero.html',
  styleUrl: './guitarhero.css',
})
export class Guitarhero implements AfterViewInit, OnDestroy {
  supabaseService = inject(SupabaseService);
  authService = inject(Auth);
  carriles = [0, 1, 2, 3];
  chart: { tiempo: number; carril: number }[] = [
    { tiempo: 0.7734909847412109, carril: 0 },
    { tiempo: 1.700503026702881, carril: 0 },
    { tiempo: 2.4384819389648436, carril: 0 },
    { tiempo: 3.1244820438690186, carril: 0 },
    { tiempo: 3.8164798912811277, carril: 0 },
    { tiempo: 4.484487870300293, carril: 0 },
    { tiempo: 5.155483047683716, carril: 0 },
    { tiempo: 5.835480110626221, carril: 0 },
    { tiempo: 6.411474020980835, carril: 1 },
    { tiempo: 7.151482078201294, carril: 0 },
    { tiempo: 7.7875608378753665, carril: 1 },
    { tiempo: 8.409469794006348, carril: 0 },
    { tiempo: 9.084487032424926, carril: 1 },
    { tiempo: 9.780475940872192, carril: 1 },
    { tiempo: 10.461486057220458, carril: 0 },
    { tiempo: 11.123503807357787, carril: 0 },
    { tiempo: 11.746478022888184, carril: 0 },
    { tiempo: 12.438519982833862, carril: 0 },
    { tiempo: 13.080506826431275, carril: 0 },
    { tiempo: 13.720497104904174, carril: 0 },
    { tiempo: 14.369530030517579, carril: 0 },
    { tiempo: 15.042488062942505, carril: 0 },
    { tiempo: 15.627501148773193, carril: 0 },
    { tiempo: 16.27756184741211, carril: 0 },
    { tiempo: 16.93649509536743, carril: 0 },
    { tiempo: 17.584475032424926, carril: 0 },
    { tiempo: 18.242503146865843, carril: 0 },
    { tiempo: 18.917479146865844, carril: 0 },
    { tiempo: 19.55648696948242, carril: 0 },
    { tiempo: 20.245496095367432, carril: 1 },
    { tiempo: 20.896488927520753, carril: 0 },
    { tiempo: 21.539502937057495, carril: 2 },
    { tiempo: 22.17549002861023, carril: 0 },
    { tiempo: 22.862482061035156, carril: 1 },
    { tiempo: 23.50846590463257, carril: 0 },
    { tiempo: 24.1844790705719, carril: 1 },
    { tiempo: 24.79152002479553, carril: 2 },
    { tiempo: 25.413489093460083, carril: 3 },
    { tiempo: 26.068485, carril: 0 },
    { tiempo: 26.705492967575072, carril: 3 },
    { tiempo: 27.404489135421752, carril: 2 },
    { tiempo: 28.071484074386596, carril: 1 },
    { tiempo: 28.713491030517577, carril: 2 },
    { tiempo: 29.357492019073486, carril: 2 },
    { tiempo: 30.025503998092653, carril: 2 },
    { tiempo: 30.619492034332275, carril: 0 },
    { tiempo: 31.290528034332276, carril: 0 },
    { tiempo: 31.982490120162964, carril: 3 },
    { tiempo: 32.66349816212463, carril: 3 },
    { tiempo: 33.29656390081787, carril: 0 },
    { tiempo: 33.97748698474121, carril: 0 },
    { tiempo: 34.62147297329712, carril: 0 },
    { tiempo: 35.30748789128113, carril: 0 },
    { tiempo: 35.953493160217285, carril: 0 },
    { tiempo: 36.56148608392334, carril: 0 },
    { tiempo: 37.18949810108948, carril: 1 },
    { tiempo: 37.85048581117248, carril: 2 },
    { tiempo: 38.49050191226196, carril: 0 },
    { tiempo: 39.14647998474121, carril: 1 },
    { tiempo: 39.81047801525879, carril: 1 },
    { tiempo: 40.452486910354615, carril: 0 },
    { tiempo: 41.12749014877319, carril: 0 },
    { tiempo: 41.774546826431276, carril: 1 },
    { tiempo: 42.41848396948242, carril: 2 },
    { tiempo: 43.069487927520754, carril: 3 },
    { tiempo: 43.74849287602234, carril: 3 },
    { tiempo: 44.39347521743775, carril: 1 },
    { tiempo: 45.06648995994568, carril: 0 },
    { tiempo: 45.734490938964846, carril: 0 },
    { tiempo: 46.3684869370575, carril: 0 },
    { tiempo: 46.977505900817874, carril: 0 },
    { tiempo: 47.61846810681153, carril: 0 },
    { tiempo: 48.25155782452393, carril: 0 },
    { tiempo: 48.85647595422363, carril: 0 },
    { tiempo: 49.487480982833866, carril: 2 },
    { tiempo: 50.09852992752075, carril: 1 },
    { tiempo: 50.77748282452393, carril: 2 },
    { tiempo: 51.35848508773804, carril: 3 },
    { tiempo: 51.99048505340576, carril: 3 },
    { tiempo: 52.62749007247925, carril: 3 },
    { tiempo: 53.24648896566772, carril: 0 },
    { tiempo: 53.8794908588562, carril: 3 },
    { tiempo: 54.511566814987184, carril: 3 },
    { tiempo: 55.10153008964539, carril: 2 },
    { tiempo: 55.734484034332276, carril: 2 },
    { tiempo: 56.35849699046326, carril: 0 },
    { tiempo: 57.05448984741211, carril: 0 },
    { tiempo: 57.67149988555908, carril: 0 },
    { tiempo: 58.269494108718874, carril: 0 },
    { tiempo: 58.84156697711182, carril: 0 },
    { tiempo: 59.44549291989136, carril: 0 },
    { tiempo: 60.07948091798401, carril: 0 },
    { tiempo: 60.70049309155274, carril: 0 },
    { tiempo: 61.321492190734865, carril: 2 },
    { tiempo: 61.95948708583069, carril: 2 },
    { tiempo: 62.57749181307983, carril: 0 },
    { tiempo: 63.23584304005432, carril: 2 },
    { tiempo: 63.81448220980835, carril: 0 },
    { tiempo: 65.09855594659423, carril: 0 },
    { tiempo: 65.5674898588562, carril: 1 },
    { tiempo: 65.97049403623963, carril: 2 },
    { tiempo: 67.49048306103515, carril: 1 },
    { tiempo: 68.11349790272521, carril: 0 },
    { tiempo: 68.78847408964539, carril: 1 },
    { tiempo: 69.4144720038147, carril: 2 },
    { tiempo: 70.05247495994568, carril: 1 },
    { tiempo: 70.68549584359741, carril: 2 },
    { tiempo: 71.34754509346008, carril: 0 },
    { tiempo: 72.00348404005432, carril: 0 },
    { tiempo: 72.65950482261658, carril: 0 },
    { tiempo: 73.28750089128113, carril: 0 },
    { tiempo: 73.94548700572204, carril: 1 },
    { tiempo: 74.6214799332428, carril: 0 },
    { tiempo: 75.26847118119812, carril: 1 },
    { tiempo: 75.94848700572204, carril: 0 },
    { tiempo: 76.59748610871887, carril: 2 },
    { tiempo: 77.22747698092651, carril: 1 },
    { tiempo: 77.86648490653992, carril: 1 },
    { tiempo: 78.52347809346008, carril: 3 },
    { tiempo: 79.14448895422363, carril: 2 },
    { tiempo: 79.79647197520447, carril: 1 },
    { tiempo: 80.41147903242492, carril: 0 },
    { tiempo: 81.03149180163574, carril: 2 },
    { tiempo: 81.69448908201599, carril: 2 },
    { tiempo: 82.31052601525879, carril: 3 },
    { tiempo: 82.77245802098084, carril: 2 },
    { tiempo: 82.98049002670288, carril: 1 },
    { tiempo: 83.73148500190734, carril: 2 },
    { tiempo: 84.32547198664857, carril: 1 },
    { tiempo: 84.9795170782013, carril: 2 },
    { tiempo: 85.63047503623963, carril: 0 },
    { tiempo: 86.29049793133545, carril: 2 },
    { tiempo: 86.94349516975403, carril: 2 },
    { tiempo: 87.55948999046326, carril: 2 },
    { tiempo: 88.1744909961853, carril: 3 },
    { tiempo: 88.78649791989136, carril: 2 },
    { tiempo: 89.41949099046326, carril: 3 },
    { tiempo: 90.03948611062621, carril: 2 },
    { tiempo: 90.64354002288819, carril: 0 },
    { tiempo: 91.36347492370605, carril: 1 },
    { tiempo: 91.99848490081787, carril: 1 },
    { tiempo: 92.69855085122681, carril: 1 },
    { tiempo: 93.2554739885559, carril: 0 },
    { tiempo: 93.90347716403198, carril: 0 },
    { tiempo: 94.51848116975403, carril: 2 },
    { tiempo: 95.13646889700317, carril: 3 },
    { tiempo: 95.71348897329712, carril: 3 },
    { tiempo: 96.34448801144408, carril: 2 },
    { tiempo: 96.97255101907349, carril: 0 },
    { tiempo: 97.61348993515014, carril: 1 },
    { tiempo: 98.19648916593933, carril: 2 },
    { tiempo: 98.81950095613098, carril: 3 },
    { tiempo: 99.44350915068054, carril: 3 },
    { tiempo: 100.07348283596802, carril: 2 },
    { tiempo: 100.7174910629425, carril: 2 },
    { tiempo: 101.32456501716614, carril: 0 },
    { tiempo: 101.95548391035462, carril: 1 },
    { tiempo: 102.5134759332428, carril: 3 },
    { tiempo: 103.13347094087219, carril: 2 },
    { tiempo: 103.82748099427795, carril: 3 },
    { tiempo: 104.4004970705719, carril: 0 },
    { tiempo: 105.00548902479554, carril: 2 },
    { tiempo: 105.70747692370605, carril: 1 },
    { tiempo: 106.09547304768371, carril: 2 },
    { tiempo: 106.51949395613099, carril: 3 },
    { tiempo: 107.3154990076294, carril: 2 },
    { tiempo: 108.0744810667572, carril: 1 },
    { tiempo: 108.71249401335145, carril: 2 },
    { tiempo: 109.42549083024598, carril: 0 },
    { tiempo: 110.07848712016296, carril: 1 },
    { tiempo: 110.71748905531311, carril: 3 },
    { tiempo: 111.38148902479553, carril: 0 },
    { tiempo: 112.01350199046325, carril: 1 },
    { tiempo: 112.61949387220764, carril: 2 },
    { tiempo: 113.25748887030029, carril: 0 },
    { tiempo: 113.93154989128112, carril: 2 },
    { tiempo: 114.51248310299682, carril: 2 },
    { tiempo: 115.13948584169006, carril: 2 },
    { tiempo: 115.80050790272522, carril: 0 },
    { tiempo: 116.44852702670288, carril: 0 },
    { tiempo: 117.1125108703003, carril: 0 },
    { tiempo: 117.73549318882752, carril: 2 },
    { tiempo: 118.32854496566773, carril: 3 },
    { tiempo: 118.93249290844726, carril: 3 },
    { tiempo: 119.57748882452393, carril: 2 },
    { tiempo: 120.19349012207032, carril: 2 },
    { tiempo: 120.84148817166138, carril: 2 },
    { tiempo: 121.43949210490418, carril: 2 },
    { tiempo: 122.09652192752075, carril: 1 },
    { tiempo: 122.72249702861023, carril: 1 },
    { tiempo: 123.40047817547607, carril: 2 },
    { tiempo: 124.06849215449525, carril: 2 },
    { tiempo: 124.68856086076354, carril: 2 },
    { tiempo: 125.32448712779235, carril: 2 },
    { tiempo: 126.00048799427796, carril: 0 },
    { tiempo: 126.64956082643127, carril: 3 },
    { tiempo: 127.268476, carril: 0 },
    { tiempo: 127.91549300953675, carril: 3 },
    { tiempo: 128.51848216975404, carril: 3 },
    { tiempo: 129.1634750858307, carril: 1 },
    { tiempo: 129.82247300190735, carril: 1 },
    { tiempo: 130.44449191607666, carril: 2 },
    { tiempo: 131.0645570267029, carril: 1 },
    { tiempo: 131.7124792117157, carril: 1 },
    { tiempo: 132.34446816784668, carril: 2 },
    { tiempo: 132.96650603051756, carril: 2 },
    { tiempo: 133.5970159961853, carril: 2 },
    { tiempo: 134.22849280735778, carril: 2 },
    { tiempo: 134.81549011253358, carril: 2 },
    { tiempo: 134.9984857844696, carril: 1 },
    { tiempo: 135.5594870667572, carril: 2 },
    { tiempo: 136.14648689509582, carril: 2 },
    { tiempo: 136.79648298664856, carril: 0 },
    { tiempo: 137.4184879523163, carril: 2 },
    { tiempo: 138.10947388174438, carril: 0 },
    { tiempo: 138.73648996185304, carril: 2 },
    { tiempo: 139.3654839809265, carril: 1 },
    { tiempo: 140.01248710299683, carril: 3 },
    { tiempo: 140.65053999809265, carril: 2 },
    { tiempo: 141.27749790081788, carril: 1 },
    { tiempo: 141.95123404768373, carril: 2 },
    { tiempo: 142.57648685694886, carril: 2 },
    { tiempo: 143.1714890591278, carril: 1 },
    { tiempo: 143.40548684931946, carril: 1 },
    { tiempo: 143.57648685313416, carril: 2 },
    { tiempo: 143.85556091607666, carril: 1 },
    { tiempo: 144.4444859923706, carril: 2 },
    { tiempo: 145.06647690653992, carril: 0 },
    { tiempo: 145.73748903242492, carril: 3 },
    { tiempo: 146.33847815068054, carril: 2 },
    { tiempo: 146.95649406484986, carril: 1 },
    { tiempo: 147.55449081117249, carril: 2 },
    { tiempo: 147.8364839370575, carril: 3 },
    { tiempo: 148.14149893896484, carril: 1 },
    { tiempo: 148.3424989141693, carril: 2 },
    { tiempo: 148.91550004196168, carril: 2 },
    { tiempo: 149.57549512397767, carril: 3 },
    { tiempo: 150.2095570076294, carril: 2 },
    { tiempo: 150.95151498283386, carril: 2 },
    { tiempo: 151.47548689891053, carril: 1 },
    { tiempo: 152.08248389509583, carril: 2 },
    { tiempo: 152.56648703623964, carril: 3 },
    { tiempo: 153.12749008010863, carril: 2 },
    { tiempo: 153.65747798664856, carril: 1 },
    { tiempo: 154.27349197138977, carril: 2 },
    { tiempo: 154.82849416021728, carril: 2 },
    { tiempo: 155.10948588174438, carril: 3 },
    { tiempo: 155.43948510490418, carril: 2 },
    { tiempo: 156.11348288746643, carril: 1 },
    { tiempo: 156.66550086839294, carril: 2 },
    { tiempo: 157.27549117547608, carril: 3 },
    { tiempo: 157.8444871678467, carril: 2 },
    { tiempo: 158.32357190463256, carril: 1 },
    { tiempo: 158.5955569256134, carril: 3 },
    { tiempo: 159.20048199427796, carril: 2 },
    { tiempo: 159.8034948550415, carril: 3 },
    { tiempo: 160.4214818817444, carril: 2 },
    { tiempo: 161.07349100572205, carril: 1 },
    { tiempo: 161.70348611634827, carril: 2 },
    { tiempo: 162.32048691607665, carril: 1 },
    { tiempo: 162.857478082016, carril: 3 },
    { tiempo: 163.05149109727478, carril: 2 },
    { tiempo: 163.396483, carril: 1 },
    { tiempo: 163.5924819217987, carril: 2 },
    { tiempo: 164.14648080926514, carril: 2 },
    { tiempo: 164.845485, carril: 1 },
    { tiempo: 165.37846792752075, carril: 2 },
    { tiempo: 166.04750083406066, carril: 3 },
    { tiempo: 166.21648814686586, carril: 2 },
    { tiempo: 166.55147019454955, carril: 1 },
    { tiempo: 166.9164970782013, carril: 2 },
    { tiempo: 167.780485917984, carril: 3 },
    { tiempo: 168.51748395422362, carril: 2 },
    { tiempo: 169.19455590272523, carril: 1 },
    { tiempo: 169.80947588937377, carril: 2 },
    { tiempo: 170.4384670114441, carril: 1 },
    { tiempo: 171.04949306866456, carril: 2 },
    { tiempo: 171.67949187983703, carril: 1 },
    { tiempo: 172.30448787602234, carril: 3 },
    { tiempo: 172.89148394277953, carril: 2 },
    { tiempo: 173.52455782643128, carril: 1 },
    { tiempo: 174.1474860934601, carril: 3 },
    { tiempo: 174.5655129599457, carril: 2 },
    { tiempo: 174.7194991678467, carril: 3 },
    { tiempo: 174.9214990705719, carril: 2 },
    { tiempo: 175.15449312016295, carril: 3 },
    { tiempo: 175.39151298283386, carril: 1 },
    { tiempo: 175.5645760267029, carril: 2 },
    { tiempo: 175.80751399427794, carril: 3 },
    { tiempo: 176.1794858474121, carril: 2 },
    { tiempo: 176.4304910743866, carril: 3 },
    { tiempo: 176.6214869332428, carril: 1 },
    { tiempo: 176.98949307629394, carril: 3 },
    { tiempo: 177.15948697520446, carril: 2 },
    { tiempo: 177.49749285694884, carril: 3 },
    { tiempo: 177.76756785694886, carril: 1 },
    { tiempo: 177.95049109918213, carril: 2 },
    { tiempo: 178.21149183978272, carril: 3 },
    { tiempo: 178.50748995613097, carril: 2 },
    { tiempo: 179.0834858664856, carril: 2 },
    { tiempo: 179.68149303814698, carril: 2 },
    { tiempo: 180.27748804196167, carril: 2 },
    { tiempo: 180.86047910871886, carril: 3 },
    { tiempo: 181.10948886839296, carril: 1 },
    { tiempo: 181.55148702861024, carril: 2 },
    { tiempo: 182.08455200762938, carril: 3 },
    { tiempo: 182.50149494659425, carril: 3 },
    { tiempo: 182.70148805531312, carril: 2 },
    { tiempo: 182.898488082016, carril: 3 },
    { tiempo: 183.1405050076294, carril: 1 },
    { tiempo: 183.36148812779237, carril: 2 },
    { tiempo: 183.97850687602235, carril: 3 },
    { tiempo: 184.53647995994567, carril: 2 },
    { tiempo: 184.7194800476837, carril: 3 },
    { tiempo: 184.94349208583068, carril: 2 },
    { tiempo: 185.12448595422364, carril: 3 },
    { tiempo: 185.41748204959106, carril: 2 },
    { tiempo: 185.6164889923706, carril: 3 },
    { tiempo: 185.82148915449523, carril: 0 },
    { tiempo: 186.04848397520448, carril: 1 },
    { tiempo: 186.30958291226196, carril: 1 },
    { tiempo: 186.50149597901915, carril: 2 },
    { tiempo: 186.87456194659424, carril: 3 },
    { tiempo: 187.0954800152588, carril: 2 },
    { tiempo: 187.36950700572206, carril: 3 },
    { tiempo: 187.57147302098085, carril: 2 },
    { tiempo: 187.79849708010863, carril: 3 },
    { tiempo: 188.03749198474122, carril: 2 },
    { tiempo: 188.27348197138977, carril: 2 },
    { tiempo: 188.85848713160706, carril: 1 },
    { tiempo: 189.4655048893738, carril: 2 },
    { tiempo: 190.0834918550415, carril: 3 },
    { tiempo: 190.71149187220763, carril: 2 },
    { tiempo: 191.34949005722046, carril: 1 },
    { tiempo: 191.96148504196168, carril: 3 },
    { tiempo: 192.55957191226196, carril: 2 },
    { tiempo: 193.1664810743866, carril: 1 },
    { tiempo: 193.5094860705719, carril: 2 },
    { tiempo: 193.78348187411498, carril: 2 },
    { tiempo: 194.05748791607667, carril: 3 },
    { tiempo: 194.44949099809264, carril: 2 },
    { tiempo: 195.07547309918212, carril: 3 },
    { tiempo: 195.69149003242492, carril: 2 },
    { tiempo: 196.31648996757508, carril: 1 },
    { tiempo: 196.67048012016298, carril: 3 },
    { tiempo: 196.9804849885559, carril: 2 },
    { tiempo: 197.139489917984, carril: 1 },
    { tiempo: 197.3594730591278, carril: 3 },
    { tiempo: 197.60349383978271, carril: 2 },
    { tiempo: 197.75749388365173, carril: 1 },
    { tiempo: 198.2244888779297, carril: 3 },
    { tiempo: 198.827483874115, carril: 2 },
    { tiempo: 199.46449700572205, carril: 1 },
    { tiempo: 200.01949995613097, carril: 3 },
    { tiempo: 200.64449612969972, carril: 2 },
    { tiempo: 201.27151798092652, carril: 1 },
    { tiempo: 201.86847903814697, carril: 3 },
    { tiempo: 202.03547909346008, carril: 2 },
    { tiempo: 202.41948590463258, carril: 1 },
    { tiempo: 202.57748589700319, carril: 3 },
    { tiempo: 203.1695688073578, carril: 2 },
    { tiempo: 203.77747482452392, carril: 2 },
    { tiempo: 204.4014870705719, carril: 2 },
    { tiempo: 205.1204831678467, carril: 2 },
    { tiempo: 205.7184909141693, carril: 2 },
    { tiempo: 206.14948984359742, carril: 1 },
    { tiempo: 206.48247408773804, carril: 3 },
    { tiempo: 207.2554900858307, carril: 2 },
    { tiempo: 208.13151306103515, carril: 1 },
    { tiempo: 208.72348211634826, carril: 2 },
    { tiempo: 212.70348411634828, carril: 2 },
    { tiempo: 213.32047491607665, carril: 3 },
    { tiempo: 213.9234740667572, carril: 2 },
    { tiempo: 214.57848698283385, carril: 1 },
    { tiempo: 215.24649495231628, carril: 2 },
    { tiempo: 215.8674800743866, carril: 3 },
    { tiempo: 216.3094909217987, carril: 2 },
    { tiempo: 216.67448910490418, carril: 1 },
    { tiempo: 217.2304810858307, carril: 2 },
    { tiempo: 217.78349994277954, carril: 3 },
    { tiempo: 218.47951316403197, carril: 2 },
    { tiempo: 219.07847795040894, carril: 1 },
    { tiempo: 219.76649008773805, carril: 2 },
    { tiempo: 220.3884900629425, carril: 3 },
    { tiempo: 221.025495082016, carril: 1 },
    { tiempo: 221.6514749446869, carril: 2 },
    { tiempo: 222.3184740476837, carril: 3 },
    { tiempo: 222.6504800743866, carril: 2 },
    { tiempo: 223.01348810299683, carril: 1 },
    { tiempo: 223.60349282643128, carril: 3 },
    { tiempo: 224.14248193133545, carril: 2 },
    { tiempo: 224.8464828626709, carril: 1 },
    { tiempo: 225.45950501335145, carril: 2 },
    { tiempo: 226.10950104386902, carril: 3 },
    { tiempo: 226.8084851602173, carril: 2 },
    { tiempo: 227.4304780743866, carril: 1 },
    { tiempo: 228.05048294659423, carril: 3 },
    { tiempo: 228.70055294468688, carril: 2 },
    { tiempo: 229.33346081880188, carril: 1 },
    { tiempo: 229.9694730228882, carril: 2 },
    { tiempo: 230.65249599427796, carril: 1 },
    { tiempo: 231.2554750934601, carril: 2 },
    { tiempo: 231.9154929370575, carril: 1 },
    { tiempo: 232.56449304005432, carril: 2 },
    { tiempo: 233.18248582833863, carril: 1 },
    { tiempo: 233.84548810871888, carril: 2 },
    { tiempo: 234.4904770858307, carril: 1 },
    { tiempo: 235.11256288555907, carril: 2 },
    { tiempo: 235.79759893896485, carril: 1 },
    { tiempo: 236.35148306484984, carril: 2 },
    { tiempo: 237.0624899141693, carril: 3 },
    { tiempo: 237.34656285313415, carril: 2 },
    { tiempo: 237.60350197711182, carril: 2 },
    { tiempo: 237.79148200190735, carril: 0 },
    { tiempo: 238.08949497329712, carril: 1 },
    { tiempo: 238.36149210871886, carril: 2 },
    { tiempo: 238.63547891226196, carril: 3 },
    { tiempo: 238.98850095994567, carril: 2 },
    { tiempo: 239.63152802098082, carril: 2 },
    { tiempo: 240.27748986457826, carril: 2 },
    { tiempo: 240.9144759446869, carril: 2 },
    { tiempo: 241.56350986076356, carril: 2 },
    { tiempo: 242.21147804577637, carril: 2 },
    { tiempo: 242.86149012779237, carril: 2 },
    { tiempo: 243.3155010076294, carril: 1 },
    { tiempo: 243.73456086457824, carril: 2 },
    { tiempo: 244.26648297901917, carril: 3 },
    { tiempo: 244.5204949885559, carril: 2 },
    { tiempo: 244.75649192370605, carril: 1 },
    { tiempo: 244.9684969294281, carril: 2 },
    { tiempo: 245.18347614305114, carril: 3 },
    { tiempo: 245.42948577874756, carril: 2 },
    { tiempo: 245.64356102288818, carril: 1 },
    { tiempo: 246.01850317738342, carril: 2 },
  ];
  tiempoActual = signal(0);
  tiempoCaida = 2.5;
  alturaPista = 460;
  puntos = signal(0);
  combo = signal(1);
  notasEnPantalla = computed(() =>
    this.chart.filter(
      (n) =>
        n.tiempo + this.GRACIA >= this.tiempoActual() &&
        n.tiempo <= this.tiempoActual() + this.tiempoCaida &&
        !this.notasAcertadas().has(n.tiempo),
    ),
  );
  vida = signal(100);
  player: any;
  mapeoTeclas: Record<string, number> = {
    q: 0,
    w: 1,
    t: 2,
    y: 3,
  };
  notasAcertadas = signal<Set<number>>(new Set());
  carrilActivo = signal<number | null>(null);
  GRACIA = 0.3;
  notasErradas = signal<Set<number>>(new Set());
  comboBump = signal(false);
  puntosBump = signal(false);
  videoTerminado = signal(false);
  videoIniciado = signal(false);
  yaPerdio = false;
  intervaloId: any;
  TOLERANCIA = 0.2;

  ngAfterViewInit() {
    if ((window as any).YT && YT.Player) {
      this.crearPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => this.crearPlayer();
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervaloId);
  }

  crearPlayer() {
    this.player = new YT.Player('player', {
      height: '270',
      width: '480',
      videoId: 'pAgnJDJN4VA',
      playerVars: { playsinline: 1, controls: 1, disablekb: 1 },
      events: {
        onReady: () => {
          this.intervaloId = setInterval(() => {
            if (!this.videoIniciado()) return;
            this.tiempoActual.set(this.player.getCurrentTime());
            this.detectarErrores();
            if ((this.perdio() || this.gano()) && !this.yaPerdio) {
              const tiempoFinal = this.terminarJuego();
              this.yaPerdio = true;
              this.player.stopVideo();
              this.supabaseService.saveGuitarHeroData({
                idUsuario: this.authService.usuario()?.id,
                puntaje: Math.floor(this.puntos()),
                gano: this.gano(),
                tiempo: tiempoFinal,
                notasAcertadas: this.notasAcertadas().size,
                notasErradas: this.notasErradas().size,
              });
              Swal.fire(
                this.gano() ? 'Ganaste!' : 'Perdiste!',
                this.gano()
                  ? 'Felicitaciones sus estadìsticas seran guardadas!'
                  : 'Sus estadìsticas seran guardadas!',
                this.gano() ? 'success' : 'error',
              );
            }
          }, 30);
        },
        onStateChange: (event: any) => {
          if (event.data === YT.PlayerState.ENDED) {
            this.videoTerminado.set(true);
          }
          if (event.data === YT.PlayerState.PLAYING) {
            if (this.gano() || this.perdio()) {
              this.player.pauseVideo();
              return;
            }
            this.videoIniciado.set(true);
          }
        },
      },
    });
  }

  terminarJuego() {
    return Math.floor(this.tiempoActual());
  }

  posicionY(nota: { tiempo: number; carril: number }) {
    return this.alturaPista * (1 - (nota.tiempo - this.tiempoActual()) / this.tiempoCaida);
  }

  clickCarril(carril: number) {
    this.combo.update((c) => c + 0.2);
    this.carrilActivo.set(carril);
    setTimeout(() => this.carrilActivo.set(null), 100);

    const ahora = this.tiempoActual();

    const candidatas = this.notasEnPantalla().filter(
      (n) => n.carril === carril && Math.abs(n.tiempo - ahora) <= this.TOLERANCIA,
    );

    if (candidatas.length == 0) {
      this.vida.update((v) => v - 10);
      this.combo.set(1);
      return;
    }

    const masCercana = candidatas.reduce((a, b) =>
      Math.abs(a.tiempo - ahora) < Math.abs(b.tiempo - ahora) ? a : b,
    );

    this.notasAcertadas.update((s) => new Set([...s, masCercana.tiempo]));
    this.puntos.update((p) => p + 1 * this.combo());
    if (this.vida() < 100) this.vida.update((v) => v + 10);
    this.triggerBump();
  }

  triggerBump() {
    this.comboBump.set(false);
    this.puntosBump.set(false);
    setTimeout(() => {
      this.comboBump.set(true);
      this.puntosBump.set(true);
    }, 0);
    setTimeout(() => {
      this.comboBump.set(false);
      this.puntosBump.set(false);
    }, 250);
  }

  detectarErrores() {
    const ahora = this.tiempoActual();
    for (const n of this.chart) {
      const yaPaso = n.tiempo + this.TOLERANCIA < ahora;
      const yaContada = this.notasAcertadas().has(n.tiempo) || this.notasErradas().has(n.tiempo);

      if (yaPaso && !yaContada) {
        this.vida.update((v) => v - 10);
        this.combo.set(1);
        this.notasErradas.update((s) => new Set([...s, n.tiempo]));
      }
    }
  }

  perdio() {
    return this.vida() <= 0;
  }

  gano() {
    return this.vida() > 0 && this.videoTerminado();
  }

  simularVictoria() {
    this.videoTerminado.set(true);
  }

  jugarDeNuevo() {
    this.puntos.set(0);
    this.vida.set(100);
    this.tiempoActual.set(0);
    this.combo.set(1);
    this.notasAcertadas.set(new Set());
    this.notasErradas.set(new Set());
    this.videoTerminado.set(false);
    this.videoIniciado.set(false);
    this.yaPerdio = false;
    this.carrilActivo.set(null);
    this.player.seekTo(0);
    this.player.playVideo();
  }
}
