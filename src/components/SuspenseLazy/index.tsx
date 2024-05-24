/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-17 18:05:09
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-17 18:05:21
 * @Description: file content
 */
import React, {Suspense, lazy} from 'react';

const SuspenseLazy = (props: any) => {
    return <Suspense fallback={<>...</>}>{React.createElement(lazy(props))}</Suspense>;
};

export default SuspenseLazy;