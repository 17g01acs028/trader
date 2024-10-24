import {
    ActivityStack,
    APITableRequestProps,
    FCBSUseQueryOptions,
    GetPaginatedAPIResponse,
    OrgSpecReqProps,
    PendingChangesStack,
    PreviousNextRecords,
    SkyErrorResponseProps,
} from "~/types";
import {axiosFullResInstance, axiosInstance} from "~/lib/axios";
import {buildAPIURLParameters} from "~/utils/APIUtils";
import {
    queryOptions,
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
    UseQueryResult
} from "@tanstack/react-query";
import {useState} from "react";
import {downloadArrayBufferFile} from "~/utils/FileUtils";
import {
    ApproveCoreWorkflowAPIRequest,
    ApproveCoreWorkflowAPIResponse,
    CreateCoreWorkflowAPIRequest,
    useApproveCoreWorkflowAPIMutation,
    useCreateCoreWorkflowAPIMutation
} from "~/features/workflows/data-access/useAdminWorkflows";
import {GetSingleContactGroupAPIResponse} from "~/features/contact-groups/data-access/useContactGroups";
// ===================================
// ENDPOINTS

export const BASE_CORE_CONTACT_ENDPOINT = "/organization/messaging/contacts/bulk";

export const contactsQueryKeys = {
    all: ["org.bulk_contact-groups"],
    list: (requestProps: OrgSpecReqProps<APITableRequestProps>) => [
        ...contactsQueryKeys.all,
        "list",
        requestProps,
    ],
    getById: (requestProps: OrgSpecReqProps<any>) => [
        ...contactsQueryKeys.all,
        "single",
        requestProps,
    ],
};


// APPROVE CREATE CUSTOMER
interface ApproveBulkSMSRequestProps {
    workflow_id: string
    payload: any
}

async function approveBulkContact(requestProps: OrgSpecReqProps<ApproveBulkSMSRequestProps>) {
    const {payload, workflow_id} = requestProps

    console.log("Request Props :: ",requestProps)
   // return await axiosInstance.post(`${BASE_CORE_CONTACT_ENDPOINT}approve/${requestProps?.partnerId}/${requestProps?.organizationId}/${workflow_id}`, payload)
}

// export function useApproveCreateCustomerMutation(): UseMutationResult<unknown, unknown, ApproveBulkSMSRequestProps, unknown> {
//     const queryClient = useQueryClient();
//     return useMutation(
//         (requestProps) =>
//             approveCreateCustomer({
//                 ...requestProps
//             }), {
//             onSuccess: () => {
//                 queryClient.invalidateQueries(customerQueryKeys.all)
//             }
//         })
// }

export function useApproveCreateBulkContactMutation(
    requestProps: OrgSpecReqProps<ApproveBulkSMSRequestProps>
): UseMutationResult<unknown, unknown, ApproveBulkSMSRequestProps, unknown> {

    return useMutation({
        mutationFn: (requestProps) => approveBulkContact(requestProps)
    });

}


interface ImportDataRequestProps {
    url: string
    entity: string
    payload: any
}

export type ImportDataMutationVariablesProps = Omit<ImportDataRequestProps, "url" | "entity">

export function useBulkContactsManageAPIMutation(
    requestProps: OrgSpecReqProps<{}>
) {
    const url = `${BASE_CORE_CONTACT_ENDPOINT}/${requestProps?.partnerId}/${requestProps?.organizationId}/import`;
    const [uploadProgress, setUploadProgress] = useState(0);
    const mutationResult: UseMutationResult<unknown, unknown, ImportDataMutationVariablesProps, unknown> = useMutation({
        mutationFn: (requestProps: ImportDataMutationVariablesProps) => {
            const {payload} = requestProps;
            return axiosInstance.post(
                url,
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                    },
                    onUploadProgress: (progressEvent) => {
                        // console.log('@onUploadProgress ', progressEvent);
                        const progEventTotal = progressEvent.total || 1;

                        if (progressEvent.lengthComputable) {
                            const progress = Math.round((progressEvent.loaded / progEventTotal) * 100);
                            setUploadProgress(progress);
                        }
                    }
                });
        },
    });

    return {
        mutationResult,
        uploadProgress
    }
}

export function useContactsManageApproveAPIMutation(
    requestProps: OrgSpecReqProps<{}>
) {
    return useApproveCoreWorkflowAPIMutation(
        `${BASE_CORE_CONTACT_ENDPOINT}/approve/${requestProps?.partnerId}/${requestProps?.organizationId}`
    );
}


// GET IMPORT STATISTICS
interface GetBulkContactReq extends APITableRequestProps {
    workflowId: string;
}

async function getImportCustomerStatistics(
    requestProps: OrgSpecReqProps<GetBulkContactReq>
) {
    let params = undefined;
    console.log("workflow details data for getImport statics ", requestProps?.workflowId);
    if (!!requestProps?.filter) {
        params = {
            filter: requestProps?.filter
        }
    }

    const axiosResponse = await axiosInstance.get(
        `${BASE_CORE_CONTACT_ENDPOINT}/statistics/${requestProps?.partnerId}/${requestProps?.organizationId}/${requestProps?.workflowId}`,
        {
            params
        }
    )
    return axiosResponse ?? null
}


export function useImportContactStatistics(
    requestProps: OrgSpecReqProps<GetBulkContactReq>,
    useQueryOptions?: any
): UseQueryResult<
    any,
    SkyErrorResponseProps
> {
    const fallback = null
    const queryData: any = useQuery(
        queryOptions({
            queryKey: contactsQueryKeys.getById(requestProps),
            queryFn: () => getImportCustomerStatistics(requestProps),
            enabled: !!requestProps?.partnerId && !!requestProps.organizationId && !!requestProps.workflowId,
            ...(useQueryOptions as any),
        })
    );

    return {
        ...queryData,
        data: queryData?.data ?? fallback
    }
}


interface ImportContactsValidationReportProps {
    workflowId: string
    validationStatus: string
}

interface ImportContactsStatisticsReportProps {
    workflowId: string
}

interface ImportContactsApproveProps {
    payload: any,
    workflowId: string,
    validationStatus: string
}

export function useDownloadBulkContactValidationReportMutationAPI(
    requestProps: OrgSpecReqProps<{}>
) {

    const [downloadProgress, setDownloadProgress] = useState(0);
    const props = requestProps

    const mutationResult: UseMutationResult<unknown, unknown, ImportContactsValidationReportProps, unknown> = useMutation({
        mutationFn: (requestProps: ImportContactsValidationReportProps) => {
            const {workflowId, validationStatus} = requestProps;

            const url = `${BASE_CORE_CONTACT_ENDPOINT}/status-report/${props?.partnerId}/${props?.organizationId}/${workflowId}`;

            const response = axiosFullResInstance.get(
                url,
                {
                    responseType: 'arraybuffer',
                    params: {
                        validationStatus: validationStatus
                    },
                    onDownloadProgress: (progressEvent) => {
                        const progressTotal = progressEvent.total || 1;
                        if (progressEvent.lengthComputable) {
                            const progress = Math.round((progressEvent.loaded / progressTotal) * 100);
                            setDownloadProgress(progress);
                        }
                    }
                }
            );

            return response;
        },
        onSuccess: (response) => {
            downloadArrayBufferFile(response);
        }
    });
    console.log("download status clicked", mutationResult)

    return {
        mutationResult,
        downloadProgress: downloadProgress
    }
}

//Bulk contacts ContactsAPIResponse
export interface ContactsAPIResponse {
    contact_id: number
    action: string
    contact_group_id: any
    contact_group_name: any
    contact_name: string
    contact_identifier_type: string
    contact_identifier: string
    date_created: string
    date_modified: string
}

// Get Cost Centers - Paginated
type GetBulkContactsImportPaginatedAPIResponse = GetPaginatedAPIResponse<ContactsAPIResponse>


async function getBulkContactsImportPaginatedAPI(requestProps: OrgSpecReqProps<GetBulkContactReq>): Promise<GetBulkContactsImportPaginatedAPIResponse> {
    return await axiosInstance.get(`${BASE_CORE_CONTACT_ENDPOINT}/${requestProps?.partnerId}/${requestProps?.organizationId}/${requestProps?.workflowId}`, {
        params: buildAPIURLParameters(requestProps, true)
    })
}

export function useGetBulkImportPaginatedAPI(
    requestProps: OrgSpecReqProps<GetBulkContactReq>,
    useQueryOptions?: FCBSUseQueryOptions<unknown, SkyErrorResponseProps, GetBulkContactsImportPaginatedAPIResponse, any>
): UseQueryResult<GetBulkContactsImportPaginatedAPIResponse, SkyErrorResponseProps> {
    return useQuery(queryOptions({
            queryKey: contactsQueryKeys.list(requestProps),
            queryFn: () => getBulkContactsImportPaginatedAPI(requestProps),
            ...useQueryOptions as any
        })
    )
}

//statistics
export function useDownloadBulkContactStatisticsMutationAPI(
    requestProps: OrgSpecReqProps<{}>
) {

    const props = requestProps
    const fallback = null

    const mutationResult: UseMutationResult<unknown, unknown, ImportContactsStatisticsReportProps, unknown> = useMutation({
        mutationFn: (requestProps: ImportContactsStatisticsReportProps) => {
            let params = undefined;
            const {workflowId} = requestProps;
            const url = `${BASE_CORE_CONTACT_ENDPOINT}/statistics/${props?.partnerId}/${props?.organizationId}/${requestProps?.workflowId}`;

            return axiosFullResInstance.get(
                url,
                {
                    params: {
                        params
                    }
                });

        }
    });
    return {
        ...mutationResult,
        data: mutationResult?.data ?? fallback
    }
}

//Bulk import useDownloadErrorReportMutation
interface DownloadErrorReport {
    fileName: string
}

export function useDownloadErrorReportMutation(
    requestProps: OrgSpecReqProps<{}>
) {
    const [downloadProgress, setDownloadProgress] = useState(0);
    const props = requestProps

    const mutationResult: UseMutationResult<unknown, unknown, DownloadErrorReport, unknown> = useMutation({
        mutationFn: (requestProps: DownloadErrorReport) => {
            const {fileName} = requestProps;

            const url = `${BASE_CORE_CONTACT_ENDPOINT}/${props?.partnerId}/${props?.organizationId}/error-report`;

            const response = axiosFullResInstance.get(
                url,
                {
                    responseType: 'arraybuffer',
                    params: {
                        fileName: fileName
                    },
                    onDownloadProgress: (progressEvent) => {
                        const progressTotal = progressEvent.total || 1;
                        if (progressEvent.lengthComputable) {
                            const progress = Math.round((progressEvent.loaded / progressTotal) * 100);
                            setDownloadProgress(progress);
                        }
                    }
                }
            );

            return response;
        },
        onSuccess: (response) => {
            downloadArrayBufferFile(response);
        }
    });
    return {
        mutationResult,
        downloadProgress: downloadProgress
    }
}

export function useApproveImportContactsMutation(
    requestProps: OrgSpecReqProps<{}>
) {
    const props = requestProps;
    const fallback = null;

    const mutationResult: UseMutationResult<unknown, unknown, ImportContactsApproveProps, unknown> = useMutation({
        mutationFn: (requestProps: ImportContactsApproveProps) => {
            const {payload, workflowId, validationStatus} = requestProps;

            if (!props?.partnerId || !props?.organizationId) {
                throw new Error('Partner ID or Organization ID is missing');
            }

            const url = `${BASE_CORE_CONTACT_ENDPOINT}/approve/${props.partnerId}/${props.organizationId}/${workflowId}`;

            console.log("payload is :: ", payload);

            return axiosInstance.post(
                url,
                payload,
                {
                    params: validationStatus ? {validationStatus} : undefined
                }
            );
        },
        onError: (error) => {
            console.error('Error approving import contacts:', error);
            // Handle error, maybe set some state, show a toast, etc.
        },
        onSuccess: (data) => {
            console.log('Successfully approved import contacts:', data);
            // Handle success, maybe navigate or update UI state
        },
    });

    console.log("Mutation result :: ", mutationResult);

    return {
        ...mutationResult,
        data: mutationResult.data ?? fallback
    };
}

// export function useBulkContactsManageApproveAPIMutation(
//     requestProps: OrgSpecReqProps<{}>
// ) {
//     return useApproveCoreWorkflowAPIMutation(
//         `${BASE_CORE_CONTACT_ENDPOINT}/approve/${requestProps?.partnerId}/${requestProps?.organizationId}`
//     );
// }

interface ImportBulkContactsProps {
    payload: any,
    workflowId: string,
    validationStatus: string
}
export function useBulkContactsManageApproveAPIMutation(
    requestProps: OrgSpecReqProps<{}>
) {
    const props = requestProps;
    const fallback = null;

    const mutationResult: UseMutationResult<unknown, unknown, ImportBulkContactsProps, unknown> = useMutation({
        mutationFn: (requestProps: ImportBulkContactsProps) => {
            const {payload, workflowId, validationStatus} = requestProps;

            if (!props?.partnerId || !props?.organizationId) {
                throw new Error('Partner ID or Organization ID is missing');
            }
            const url = `${BASE_CORE_CONTACT_ENDPOINT}/approve/${props.partnerId}/${props.organizationId}/${workflowId}`;
            return axiosInstance.post(
                url,
                payload,
                {
                    params: validationStatus ? {validationStatus} : undefined
                }
            );
        },
    });
    return {
        ...mutationResult,
        data: mutationResult.data ?? fallback
    };
}



