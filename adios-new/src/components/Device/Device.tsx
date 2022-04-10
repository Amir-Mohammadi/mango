import { As, Center, CSSObject, Icon, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { IButtonIconProps } from '../../app/device/LightDevice';



export interface IDeviceProps {
  id?: string;
  value?: string;

  containerStyle?: CSSObject;
  flexStyle?: CSSObject;
  topStyle?: CSSObject;
  infoStyle?: CSSObject;
  picStyle?: CSSObject;
  deviceNameStyle?: CSSObject;
  whiteSpaceStyle?: CSSObject;
  zoneStyle?: CSSObject;
  imageStyle?: CSSObject;
  shadowImageStyle?: CSSObject;
  iconLocationStyle?: CSSObject;
  bottomStyle?: CSSObject;
  buttonStyle?: CSSObject;

  locationNameSize?: As;
  locationName?: string;
  imageDevice?: string;
  alt?: string;

  iconDimensions?: string;
  iconColor?: string;
  iconFillColor?: string;
  svg?: string;

  controlButton?: IButtonProps[];
  deviceName?: IDeviceNameProps;
  zone?: IZoneProps;
  image?: IImageProps;
  shadowImage?: IShadowImageProps;
}

export interface IButtonProps {
  icon?: React.ReactElement;
  tooltip?: string;
}

export interface IDeviceNameProps {
  text?: React.ReactElement;
}

export interface IZoneProps {
  icon?: React.ReactElement;
  text?: React.ReactElement;
}

export interface IImageProps {
  image?: React.ReactElement;
}

export interface IShadowImageProps {
  image?: React.ReactElement;
}

type Props = IDeviceProps & IButtonIconProps;

export const Device: React.FC<Props> = (props) => {
  const [isSettingDisable, setSettingDisable] = useState<true | false>(
    props.setting
  );

  return (
    <Center sx={{ ...CONTAINER, ...props.containerStyle }}>
      <Center
        sx={{ ...FLEX, ...props.flexStyle }}
        flexDirection={'column'}
        style={{
          width: '40%',
          flexGrow: 1,
          minHeight: '314px',
          minWidth: '341px',
          maxWidth: '698px',
          margin: '0 5px 10px',
          justifyContent: 'space-between',
        }}
      >
        <Center sx={{ ...TOP_FLEX, ...props.topStyle }}>
          <Center
            sx={{ ...INFO_FLEX, ...props.infoStyle }}
            flexDirection={'column'}
          >
            <Center sx={{ ...DEVICE_NAME_FLEX, ...props.deviceNameStyle }}>
              {props.deviceName?.text}
            </Center>
            <Center sx={{ ...ZONE_FLEX, ...props.zoneStyle }}>
              <Center bg={'#00000041'} padding={2} borderRadius={15} mr={3}>
                {props.zone?.icon}
                &ensp;
                {props.zone?.text}
              </Center>
            </Center>
            <Center
              sx={{ ...WHITE_SPACE_FLEX, ...props.whiteSpaceStyle }}
            ></Center>
          </Center>
          <Center position={'relative'} sx={{ ...PIC_FLEX, ...props.picStyle }}>
            <Center sx={{ ...IMAGE_FLEX, ...props.imageStyle }} zIndex={99}>
              {props.image?.image}
            </Center>
            <Center
              position={'absolute'}
              left={'0px'}
              top={'14px'}
              zIndex={0}
              sx={{ ...SHADOW_IMAGE_FLEX }}
            >
              {props.shadowImage?.image}
            </Center>
          </Center>
        </Center>
        <Center
          justifyContent={'space-between'}
          sx={{ ...BOTTOM_FLEX, ...props.bottomStyle }}
        >
          <Center ml={2}>
            <Tooltip label={'تنظیمات'} justifySelf={'flex-start'}>
              <Icon
                justifySelf={'center'}
                flex={1}
                mr={'28px'}
                width="6.25"
                height="26.129"
                viewBox="0 0 6.25 26.129"
                onClick={() => {}}
                cursor={'pointer'}
              >
                <path
                  d="M10.925,10.739a3.125,3.125,0,1,0,3.124,3.125,3.125,3.125,0,0,0-3.124-3.125Zm0-3.692A3.124,3.124,0,1,0,7.8,3.925a3.124,3.124,0,0,0,3.125,3.122Zm0,13.631A3.125,3.125,0,1,0,14.05,23.8a3.125,3.125,0,0,0-3.125-3.125Z"
                  transform="translate(-7.8 -0.8)"
                  fill={isSettingDisable ? 'white' : '#fff'}
                />
              </Icon>
            </Tooltip>
          </Center>
          <Center flex={1} overflow={'hidden'}>
            <ScrollContainer>
              <Center sx={{ ...ICON_LOCATION, ...props.iconLocationStyle }}>
                {props.controlButton?.map((buttonProps) => {
                  return (
                    <Center>
                      <Tooltip label={buttonProps.tooltip}>
                        {buttonProps.icon}
                      </Tooltip>
                      &ensp;
                    </Center>
                  );
                })}
              </Center>
            </ScrollContainer>
          </Center>

          <Center ml={5}>
            &ensp;
            <Tooltip
              label={props.charge === false ? 'بدون شارژ' : 'شارژ شده'}
              alignSelf={'flex-start'}
              flexDirection={'row'}
            >
              <Icon
                width="15.21"
                height="31.33"
                viewBox="0 0 475.776 951.552"
                onClick={() => props.onClickCharge()}
              >
                <path
                  d="M419.5,97.155H340.043V2H149.733V97.155H70.278A63.557,63.557,0,0,0,7,160.433V889.8c0,35.208,28.547,63.754,63.278,63.754H419.022c35.207,0,63.754-28.547,63.754-63.278V160.433A63.557,63.557,0,0,0,419.5,97.155ZM197.31,858.4V596.72H102.155l190.31-356.832V501.565h95.155Z"
                  transform="translate(-7 -2)"
                  fill={props.charge ? 'white' : '#264165'}
                />
              </Icon>
            </Tooltip>
            &ensp;
            <Tooltip
              label={props.beep === false ? 'حالت بی صدا' : 'حالت با صدا'}
            >
              <Icon
                width="27.829"
                height="20.289"
                viewBox="0 0 27.829 20.289"
                mr={'3px'}
                onClick={() => props.onClickBeep()}
              >
                <path
                  d="M28.136,24.085,20.8,29.059H17.479A2.517,2.517,0,0,0,15,31.612V36.64a2.517,2.517,0,0,0,2.479,2.553h3.315l7.315,4.989a1.477,1.477,0,0,0,1.367-.177,1.571,1.571,0,0,0,.661-1.245l.042-17.252a1.571,1.571,0,0,0-.666-1.254,1.476,1.476,0,0,0-1.378-.169ZM33.922,39.54a.957.957,0,0,1-.942-.877.971.971,0,0,1,.753-1.053,3.592,3.592,0,0,0-.019-7.016.974.974,0,0,1-.738-1.15.947.947,0,0,1,1.116-.76,5.554,5.554,0,0,1,.03,10.824A.92.92,0,0,1,33.922,39.54Z"
                  transform="translate(-15 -23.987)"
                  fill={props.beep ? 'white' : '#264165'}
                />
                <path
                  d="M68.687,44.578a.955.955,0,0,1-.939-.815.978.978,0,0,1,.632-1.084,8.216,8.216,0,0,0,0-15.389.982.982,0,0,1-.589-1.238.94.94,0,0,1,1.2-.606,10.185,10.185,0,0,1,0,19.076A.918.918,0,0,1,68.687,44.578Z"
                  transform="translate(-47.778 -24.846)"
                  fill={props.beep ? 'white' : '#264165'}
                />
              </Icon>
            </Tooltip>
          </Center>
        </Center>
      </Center>
    </Center>
  );
};

const CONTAINER: CSSObject = {
  color: 'white',
};

const FLEX: CSSObject = {
  paddingTop: 0,
  justifyContent: 'center',
  alignItems: 'center',
};

const TOP_FLEX: CSSObject = {
  flex: 3.25,
};

const INFO_FLEX: CSSObject = {
  flex: 1.2,
};

const PIC_FLEX: CSSObject = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  ml: '5px',
};

const BOTTOM_FLEX: CSSObject = {
  flex: 1,
  zIndex: 1,
};

const DEVICE_NAME_FLEX: CSSObject = {
  flex: 1,
  mt: 10,
  mr: 7,
};

const ZONE_FLEX: CSSObject = {
  padding: 5,
  paddingTop: 2,
  pl: 0,
  flex: 1,
};

const WHITE_SPACE_FLEX: CSSObject = {
  flex: 3.5,
};

const IMAGE_FLEX: CSSObject = {};

const SHADOW_IMAGE_FLEX: CSSObject = {
  flex: 1,
};

const ICON_LOCATION: CSSObject = {
  flex: 1,
};
