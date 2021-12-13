import { ref } from "vue";
import {
    DataFetchAlert, DataFetchAlertResult,
    DataField,
    DataStats, DataTableProps, GetRequestType,
    ObjectType, PermittedEvents,
    SortStyle,
    TableStyle,
} from "./dtTypes";

const defaultTableStyle: TableStyle = {
    table      : "w3-table w3-striped w3-border w3-bordered w3-hoverable",
    tableHeader: "w3-red",
    tableBody  : "w3-hover",
}
const defaultSortStyle: SortStyle = {
    asc : "fa fa-caret-up",
    desc: "fa fa-caret-down",
}
const defaultPageLimits: Array<number> = [10, 20, 30, 50, 100, 200]
const defaultPermittedEvents: Array<PermittedEvents> = ["click", "mouseover", "mouseleave", "mouseenter"]

export function useDatatable(props?: DataTableProps) {
    const tableStyle = ref<TableStyle>(defaultTableStyle)
    const sortStyle = ref<SortStyle>(defaultSortStyle)
    const dataFields = ref<Array<DataField>>([])
    const dataItems = ref<Array<ObjectType>>([])
    const dataStats = ref<DataStats>({})
    const dataFetchAlert = ref<DataFetchAlert>()
    const paging = ref<boolean>(true)
    const pageStart = ref<number>(1)
    const pageLimit = ref(10)
    const currentPage = ref(1)
    const searchKey = ref("")
    const dataItemsCount = ref(0)
    const searchItemsCount = ref(0)
    const dataCount = ref(0)
    const dataTotal = ref<number>(0)
    const totalRecordsCount = ref(0)
    const pageLimits = ref<Array<number>>(defaultPageLimits)
    const permittedEvents = ref<Array<PermittedEvents>>(defaultPermittedEvents)
    const fetchAlertResult = ref<DataFetchAlertResult>({skip: 0,})

    if (props && props.tableStyle) {
        tableStyle.value = props.tableStyle
    }
    if (props && props.sortStyle) {
        sortStyle.value = props.sortStyle
    }
    if (props && props.dataFields) {
        dataFields.value = props.dataFields
    }
    if (props && props.dataItems) {
        dataItems.value = props.dataItems
        dataTotal.value = props.dataItems.length
    }
    if (props && props.dataStats) {
        dataStats.value = props.dataStats
    }
    if (props && props.dataFetchAlert) {
        dataFetchAlert.value = props.dataFetchAlert
    }
    if (props && props.paging) {
        paging.value = props.paging
    }
    if (props && props.pageStart) {
        pageStart.value = props.pageStart
    }
    if (props && props.pageLimits) {
        pageLimits.value = props.pageLimits
    }
    if (props && props.permittedEvents) {
        permittedEvents.value = props.permittedEvents
    }
    if (props && props.dataStats && props.dataStats.totalRecordsCount) {
        totalRecordsCount.value = props.dataStats.totalRecordsCount
    }

    if (!dataFetchAlert.value) {
        dataFetchAlert.value = async (val: DataFetchAlertResult, getRequest?: GetRequestType) => {
            // store fetchAlertResult
            fetchAlertResult.value = val
            // perform the required crud-action/task
            if (val.fetchAlert && getRequest) {
                await getRequest({
                    skip : val.skip,
                    limit: val.limit,
                })
            }
        }
    }

    const setPageLimit = (val: number) => {
        pageLimit.value = val
    }

    const setSearchKeyValue = (val: string) => {
        searchKey.value = val
    }

    const setCurrentPage = (val: number) => {
        currentPage.value = val
    }

    const setDataItemsValue = (val: Array<ObjectType>) => {
        dataItems.value = val
        dataItemsCount.value = val.length
    }

    const setDataItemsCount = (val?: number) => {
        dataItemsCount.value = val ? val : dataItems.value.length
    }

    const setSearchItemsCount = (val: number) => {
        searchItemsCount.value = val
    }

    const setDataItemsTotal = (val: number) => {
        dataTotal.value = val
    }

    return {
        tableStyle, sortStyle, dataFields, dataItems, dataStats, paging, pageStart, pageLimit, currentPage,
        searchKey, dataCount, dataTotal, totalRecordsCount, pageLimits, permittedEvents, dataFetchAlert,
        setPageLimit, setSearchKeyValue, setCurrentPage, setDataItemsTotal, setDataItemsValue, setDataItemsCount,
        dataItemsCount, searchItemsCount, setSearchItemsCount, defaultTableStyle, defaultSortStyle,
    }
}
