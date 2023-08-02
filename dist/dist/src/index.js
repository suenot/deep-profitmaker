var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('react');
require('graphql');
require('lodash');
require('subscriptions-transport-ws');
const { generateApolloClient } = require("@deep-foundation/hasura/client");
const { DeepClient } = require('@deep-foundation/deeplinks/imports/client');
const { minilinks, Link } = require('@deep-foundation/deeplinks/imports/minilinks');
const apolloClient = generateApolloClient({
    path: process.env.NEXT_PUBLIC_GQL_PATH || '',
    ssl: !!~process.env.NEXT_PUBLIC_GQL_PATH.indexOf('localhost') ? false : true,
});
const unloginedDeep = new DeepClient({ apolloClient });
const delay = (time = 1000) => new Promise(res => setTimeout(res, time));
const f = () => __awaiter(this, void 0, void 0, function* () {
    const guest = yield unloginedDeep.guest();
    const guestDeep = new DeepClient(Object.assign({ deep: unloginedDeep }, guest));
    const admin = yield guestDeep.login({ linkId: yield guestDeep.id('deep', 'admin') });
    const deep = new DeepClient(Object.assign({ deep: guestDeep }, admin));
    const User = yield deep.id('@deep-foundation/core', 'User');
    const Type = yield deep.id('@deep-foundation/core', 'Type');
    const Any = yield deep.id('@deep-foundation/core', 'Any');
    const Join = yield deep.id('@deep-foundation/core', 'Join');
    const Contain = yield deep.id('@deep-foundation/core', 'Contain');
    const Value = yield deep.id('@deep-foundation/core', 'Value');
    const String = yield deep.id('@deep-foundation/core', 'String');
    const Package = yield deep.id('@deep-foundation/core', 'Package');
    const SyncTextFile = yield deep.id('@deep-foundation/core', 'SyncTextFile');
    const dockerSupportsJs = yield deep.id('@deep-foundation/core', 'dockerSupportsJs');
    const Handler = yield deep.id('@deep-foundation/core', 'Handler');
    const HandleInsert = yield deep.id('@deep-foundation/core', 'HandleInsert');
    const HandleDelete = yield deep.id('@deep-foundation/core', 'HandleDelete');
    const Tree = yield deep.id('@deep-foundation/core', 'Tree');
    const TreeIncludeNode = yield deep.id('@deep-foundation/core', 'TreeIncludeNode');
    const TreeIncludeUp = yield deep.id('@deep-foundation/core', 'TreeIncludeUp');
    const TreeIncludeFromCurrent = yield deep.id('@deep-foundation/core', 'TreeIncludeFromCurrent');
    const Rule = yield deep.id('@deep-foundation/core', 'Rule');
    const RuleSubject = yield deep.id('@deep-foundation/core', 'RuleSubject');
    const RuleObject = yield deep.id('@deep-foundation/core', 'RuleObject');
    const RuleAction = yield deep.id('@deep-foundation/core', 'RuleAction');
    const Selector = yield deep.id('@deep-foundation/core', 'Selector');
    const SelectorInclude = yield deep.id('@deep-foundation/core', 'SelectorInclude');
    const SelectorExclude = yield deep.id('@deep-foundation/core', 'SelectorExclude');
    const SelectorTree = yield deep.id('@deep-foundation/core', 'SelectorTree');
    const containTree = yield deep.id('@deep-foundation/core', 'containTree');
    const AllowInsertType = yield deep.id('@deep-foundation/core', 'AllowInsertType');
    const AllowDeleteType = yield deep.id('@deep-foundation/core', 'AllowDeleteType');
    const SelectorFilter = yield deep.id('@deep-foundation/core', 'SelectorFilter');
    const Query = yield deep.id('@deep-foundation/core', 'Query');
    const usersId = yield deep.id('deep', 'users');
    const { data: [{ id: packageId }] } = yield deep.insert({
        type_id: Package,
        string: { data: { value: `@deep-foundation/profitmaker` } },
        in: { data: [
                {
                    type_id: Contain,
                    from_id: deep.linkId
                },
            ] },
        out: { data: [
                {
                    type_id: Join,
                    to_id: yield deep.id('deep', 'users', 'packages'),
                },
                {
                    type_id: Join,
                    to_id: yield deep.id('deep', 'admin'),
                },
            ] },
    });
    console.log({ packageId });
    const { data: [{ id: BrokerProvider }] } = yield deep.insert({
        type_id: Type,
        from_id: Any,
        to_id: Any,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'BrokerProvider' } },
            } },
    });
    console.log({ BrokerProvider });
    const { data: [{ id: Asset }] } = yield deep.insert({
        type_id: Type,
        from_id: Any,
        to_id: Any,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Asset' } },
            } },
    });
    console.log({ Asset });
    const { data: [{ id: Isin }] } = yield deep.insert({
        type_id: Type,
        from_id: BrokerProvider,
        to_id: Asset,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Isin' } },
            } },
    });
    console.log({ Isin });
    const { data: [{ id: AssetTicker }] } = yield deep.insert({
        type_id: Type,
        from_id: BrokerProvider,
        to_id: Asset,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'AssetTicker' } },
            } },
    });
    console.log({ AssetTicker });
    const { data: [{ id: AssetData }] } = yield deep.insert({
        type_id: Type,
        from_id: BrokerProvider,
        to_id: Asset,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'AssetData' } },
            } },
    });
    console.log({ AssetData });
    const { data: [{ id: Instrument }] } = yield deep.insert({
        type_id: Type,
        from_id: Any,
        to_id: Any,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Instrument' } },
            } },
    });
    console.log({ Instrument });
    const { data: [{ id: Figi }] } = yield deep.insert({
        type_id: Type,
        from_id: BrokerProvider,
        to_id: Instrument,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Figi' } },
            } },
    });
    console.log({ Figi });
    const { data: [{ id: InstrumentTicker }] } = yield deep.insert({
        type_id: Type,
        from_id: BrokerProvider,
        to_id: Asset,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'InstrumentTicker' } },
            } },
    });
    console.log({ InstrumentTicker });
    const { data: [{ id: InstrumentData }] } = yield deep.insert({
        type_id: Type,
        from_id: BrokerProvider,
        to_id: Instrument,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'InstrumentData' } },
            } },
    });
    console.log({ InstrumentData });
    const { data: [{ id: Wallet }] } = yield deep.insert({
        type_id: Type,
        from_id: User,
        to_id: BrokerProvider,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Wallet' } },
            } },
    });
    console.log({ Wallet });
    const { data: [{ id: Transaction }] } = yield deep.insert({
        type_id: Type,
        from_id: Wallet,
        to_id: Wallet,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Transaction' } },
            } },
    });
    console.log({ Transaction });
    const { data: [{ id: Base }] } = yield deep.insert({
        type_id: Type,
        from_id: Any,
        to_id: Any,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Base' } },
            } },
    });
    console.log({ Base });
    const { data: [{ id: Quote }] } = yield deep.insert({
        type_id: Type,
        from_id: Any,
        to_id: Any,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Quote' } },
            } },
    });
    console.log({ Quote });
    const { data: [{ id: Price }] } = yield deep.insert({
        type_id: Type,
        from_id: Transaction,
        to_id: Instrument,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Price' } },
            } },
    });
    console.log({ Price });
    const { data: [{ id: Amount }] } = yield deep.insert({
        type_id: Type,
        from_id: Transaction,
        to_id: Instrument,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Amount' } },
            } },
    });
    console.log({ Amount });
    const { data: [{ id: Total }] } = yield deep.insert({
        type_id: Type,
        from_id: Amount,
        to_id: Price,
        in: { data: {
                type_id: Contain,
                from_id: packageId,
                string: { data: { value: 'Total' } },
            } },
    });
    console.log({ Total });
});
f();
//# sourceMappingURL=index.js.map