

import LocationHome, { ReactComponent as LocationHomeW } from './locationHome.svg';
import PedConfirmacion, { ReactComponent as PedConfirmacionW } from './pedConfirmacion.svg';
import PedDelivery, { ReactComponent as PedDeliveryW } from './pedDelivery.svg';
import PedPreparacion, { ReactComponent as PedPreparacionW } from './pedPreparacion.svg';


import RestauranteLogo, { ReactComponent as RestauranteLogoW } from './restauranteLogo.svg';
import UserLogo, { ReactComponent as UserLogoW } from './userLogo.svg';
import IChat, { ReactComponent as IChatW } from './iChat.svg';
// import Location, { ReactComponent as LocationW } from './location.svg';

const Assets = {
	"LocationHome": { Native: LocationHome, Web: LocationHomeW },
	"PedConfirmacion": { Native: PedConfirmacion, Web: PedConfirmacionW },
	"PedDelivery": { Native: PedDelivery, Web: PedDeliveryW },
	"PedPreparacion": { Native: PedPreparacion, Web: PedPreparacionW },
	"RestauranteLogo": { Native: RestauranteLogo, Web: RestauranteLogoW },
	"UserLogo": { Native: UserLogo, Web: UserLogoW },
	"IChat": { Native: IChat, Web: IChatW },
}

export default Assets;