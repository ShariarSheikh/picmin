export interface OptionsState {
  font: string
  fontColor: string
  backgroundColor: string
  borderRadius: number
  fontFamily: string
  fontVariant: Array<{
    name: string
    weight: string
    style: string
    url: string
  }>
  selectedFontVariant: {
    name: string
    style: string
    weight: string
    url: string
  }
  demo: {
    fontSize: number
  }
  real: {
    fontSize: number
  }
}

export const initialOptions: OptionsState = {
  font: 'Pi',
  fontColor: '#ffffff',
  backgroundColor: '#0042C7',
  borderRadius: 18,
  fontFamily: 'ABeeZee',
  fontVariant: [
    {
      name: 'Regular 400 Normal',
      style: 'normal',
      weight: '400',
      url: 'http://fonts.gstatic.com/s/abeezee/v22/esDR31xSG-6AGleN6tKukbcHCpE.ttf',
    },
    {
      name: 'Regular 400 Italic',
      style: 'italic',
      weight: '400',
      url: 'http://fonts.gstatic.com/s/abeezee/v22/esDT31xSG-6AGleN2tCklZUCGpG-GQ.ttf',
    },
  ],
  selectedFontVariant: {
    name: 'Regular 400 Normal',
    style: 'normal',
    weight: '400',
    url: 'http://fonts.gstatic.com/s/abeezee/v22/esDR31xSG-6AGleN6tKukbcHCpE.ttf',
  },
  demo: {
    fontSize: 16,
  },
  real: {
    fontSize: 200,
  },
}
