var dynamodbBatchWriter = require('./');

test('write 1 item has empty elements on to PS4Games table', (done) => {
	dynamodbBatchWriter.init('wallpaper_gallery', 'ap-southeast-1');
	var writeRequests = [
		{
			PutRequest: {
				Item: {
					index : '1295',
					title : 'Zotrix',
					description : 'Get Zotrix, Shooter game for PS4 console from the official PlayStation website. Explore Zotrix game detail, demo, images, videos, reviews.',
					context : '',
					content_type : 'game, image',
					feature : '',
					featured : 'false',
					keywords : 'playstation, ps4, playstation, ps4',
					platform : 'PS4',
					genre : 'Shooter',
					rating : 'E,E',
					image : 'https://media.playstation.com/is/image/SCEA/zotrix-listing-thumb-01-ps4-us-08dec15?$Icon$',
					video_url : '',
					video_desc : '',
					image_url : '//media.playstation.com/is/image/SCEA/zotrix-screenshot-01-ps4-us-08dec15, //media.playstation.com/is/image/SCEA/zotrix-screenshot-02-ps4-us-08dec15, //media.playstation.com/is/image/SCEA/zotrix-screenshot-03-ps4-us-08dec15, //media.playstation.com/is/image/SCEA/zotrix-screenshot-04-ps4-us-08dec15, //media.playstation.com/is/image/SCEA/zotrix-screenshot-05-ps4-us-08dec15, //media.playstation.com/is/image/SCEA/zotrix-screenshot-06-ps4-us-08dec15, //media.playstation.com/is/image/SCEA/zotrix-screenshot-07-ps4-us-08dec15, //media.playstation.com/is/image/SCEA/zotrix-screenshot-08-ps4-us-08dec15, //media.playstation.com/is/image/SCEA/zotrix-screenshot-09-ps4-us-08dec15, //media.playstation.com/is/image/SCEA/zotrix-screenshot-10-ps4-us-08dec15',
					image_desc : 'zotrix-screenshot-01-ps4-us-08dec15, zotrix-screenshot-02-ps4-us-08dec15, zotrix-screenshot-03-ps4-us-08dec15, zotrix-screenshot-04-ps4-us-08dec15, zotrix-screenshot-05-ps4-us-08dec15, zotrix-screenshot-06-ps4-us-08dec15, zotrix-screenshot-07-ps4-us-08dec15, zotrix-screenshot-08-ps4-us-08dec15, zotrix-screenshot-09-ps4-us-08dec15, zotrix-screenshot-10-ps4-us-08dec15',
					release_date : 'Tue, 08 Dec 2015 00:00:00 GMT',
					release_date_display : 'Out Now',
					url : 'https://www.playstation.com/en-us/games/zotrix-ps4/',
					psnId : 'UP2035-CUSA03223_00-ZOTRIXGAMEUS0001',
					buttonTxt : '',
					sku : '',
					upc : '',
					buttonType : '',
					buttonURL : '',
					buttonColor : '',
					ageRatingImage : '//media.playstation.com/is/image/SCEA/E_ESRB_agerating_us_02Jun14?$Icon$',
					ageRatingImageAlt : 'E'
				}
      }
		}
	];
	dynamodbBatchWriter.batchWriteItems('PS4Games', writeRequests, () => {
		done();
	});
})