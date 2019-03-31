export declare class Matrix3D {
    n11: number;
    n12: number;
    n13: number;
    n14: number;
    n21: number;
    n22: number;
    n23: number;
    n24: number;
    n31: number;
    n32: number;
    n33: number;
    n34: number;
    n41: number;
    n42: number;
    n43: number;
    n44: number;
    protected _temp: Float32Array;
    constructor(p11?: number, p12?: number, p13?: number, p14?: number, p21?: number, p22?: number, p23?: number, p24?: number, p31?: number, p32?: number, p33?: number, p34?: number, p41?: number, p42?: number, p43?: number, p44?: number);
    /**
     * column major order
     */
    float32Array: Float32Array;
    setLookAt(eyeX: number, eyeY: number, eyeZ: number, targetX: number, targetY: number, targetZ: number, upX: number, upY: number, upZ: number): void;
    identity(): Matrix3D;
    invertTR(): Matrix3D;
    toArray(out: Float32Array, columnMajor?: boolean): Float32Array;
    fromArray(arr: Float32Array, columnMajor?: boolean): void;
}
