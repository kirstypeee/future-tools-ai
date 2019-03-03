export interface IStoreState {
    router: any;
    classification: IClassification | null;
    loading: boolean;
    user: IUser | {};
}

export interface IPayload {
    user: IUser;
    classification: IClassification;
    feedback: IFeedback[];
    deleteData: boolean;
}

export interface IUser {
    name: string;
    imgData: string;
}

export interface IClassification {
    minAge: number;
    maxAge: number;
    gender: string;
    neuroticism: string;
    agreeableness: string;
    conscientiousness: string;
    extraversion: string;
    openness: string;
    clothing: string;
}

export interface IFeedback {
    sentiment: 'positive' | 'negative';
    sentence: string;
    associatedTrait: string;
}