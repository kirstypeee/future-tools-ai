export interface IStoreState {
    router: any,
    tiles: ITile[]
    banner: IBanner;
    loading: boolean;
    forms: IForm[];
}

export interface ITile {
    id: number,
    title: string,
    created_at: number,
    updated_at: number,
    tileImage: IImage,
    backgroundImage: IImage
}

export interface IForm {
    id: number,
    formTitle: string,
    formDescription: string,
    panelTitle: string,
    panelParagraphOne: string,
    panelParagraphTwo: string,
    checkboxText: string,
    created_at: number,
    updated_at: number,
    panelImage: IImage
}

export interface IBanner {
    id: number,
    title: string,
    created_at: number,
    updated_at: number,
    "banner-image": IImage,
    details: string,
    address: string,
    headline: string
}

export interface IImage {
    id: number,
    name: string,
    hash: string,
    sha256: string,
    ext: string,
    mime: string,
    size: string,
    url: string,
    provider: string,
    public_id: null,
    created_at: number,
    updated_at: number
}

export interface IAttendee {
    firstName: string;
    lastName: string;
    emailAddress: string;
    company: string;
    attendWorkshop: boolean;
}