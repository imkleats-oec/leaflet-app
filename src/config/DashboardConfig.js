
const PERCENT_DECIMAL = 'percentDecimal';
const AS_PERCENT = 'asPercent';
const ROUNDED = 'rounded';
const INTEGER = 'integer';
const CURRENCY = 'currency';

function formatValue(v, method) {
    switch(method) {
        case PERCENT_DECIMAL:
            return `${Math.round(10000*v)/100}%`;
        case AS_PERCENT:
            return `${Math.round(100*v)/100}%`;
        case ROUNDED:
            return `${Math.round(100*v)/100}`;
        case INTEGER:
            return `${Math.round(v)}`;
        case CURRENCY:
            return `$${v}`;
        default:
            return `${v}`;
    }
}

const ProviderDetailConfig = {
    columns: {
        display: "Census Tract",
        featureId: "Name",
        typeId: "ProviderType",
        ratingId: "QrisRating"
    },
    rows: [
        {
            display: "Provider ID",
            featureId: "ProviderID",
            fmt: v => formatValue(v, INTEGER),
        },
        {
            display: "Licensed Capacity",
            featureId: "LicensedCapacity",
            fmt: v => formatValue(v, INTEGER),
        },
        {
            display: "Early Childhood Council",
            featureId: "ECC",
            fmt: v => formatValue(v, "text"),
        },
    ]
};

const DashboardConfig = {
    columns: {
        display: "Census Tract",
        featureId: "NAME_y",
    },
    rows: [
        {
            display: "Providers",
            featureId: "ProviderID",
            fmt: v => formatValue(v, INTEGER),
        },
        {
            display: "Capacity",
            featureId: "LicensedCapacity",
            fmt: v => formatValue(v, INTEGER),
        },
        {
            display: "Avg. Quality Rating",
            featureId: "wQRIS",
            fmt: v => formatValue(v, ROUNDED),
        },
        {
            display: "Diversity Index",
            featureId: "diversity",
            fmt: v => formatValue(v, PERCENT_DECIMAL),
        },
        {
            display: "% Earners Below $25k",
            featureId: "percent_below_25k",
            fmt: v => formatValue(v, AS_PERCENT),
        },
    ]
};

export {ProviderDetailConfig};
export default DashboardConfig;