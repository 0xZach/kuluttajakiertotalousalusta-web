type Motive = {
    id: string;
    motive: string;
    motiveCategory: string;
    hits?: number;
};

type MotivePayload = {
    motiveIds: number[];
};
