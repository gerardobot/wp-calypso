/** @format */

/**
 * Internal dependencies
 */

import {
	MEMBERSHIPS_SUBSCRIPTIONS_LIST,
	MEMBERSHIPS_SUBSCRIPTIONS_RECEIVE,
	MEMBERSHIPS_SUBSCRIPTIONS_LIST_SUCCESS,
	MEMBERSHIPS_SUBSCRIPTIONS_LIST_FAILURE,
	MEMBERSHIPS_SUBSCRIPTION_STOP,
	MEMBERSHIPS_SUBSCRIPTION_STOP_SUCCESS,
	MEMBERSHIPS_SUBSCRIPTION_STOP_FAILURE,
} from 'state/action-types';
import { combineReducers, createReducer } from 'state/utils';

/**
 * Returns the updated items state after an action has been dispatched.
 * The state contains all past and upcoming billing transactions.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export const items = createReducer( [], {
	[ MEMBERSHIPS_SUBSCRIPTIONS_RECEIVE ]: ( state, { subscriptions } ) => subscriptions,
	[ MEMBERSHIPS_SUBSCRIPTION_STOP_SUCCESS ]: ( state, { subscriptionId } ) =>
		state.filter( sub => sub.ID !== subscriptionId ),
} );

/**
 * Returns the updated requests state after an action has been dispatched.
 * The state contains whether a request for billing transactions is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export const requesting = createReducer( false, {
	[ MEMBERSHIPS_SUBSCRIPTIONS_LIST ]: () => true,
	[ MEMBERSHIPS_SUBSCRIPTIONS_LIST_SUCCESS ]: () => false,
	[ MEMBERSHIPS_SUBSCRIPTIONS_LIST_FAILURE ]: () => false,
} );

export const stoppingSubscription = createReducer( [], {
	[ MEMBERSHIPS_SUBSCRIPTION_STOP ]: ( state, { subscriptionId } ) => ( {
		...state,
		[ subscriptionId ]: 'start',
	} ),
	[ MEMBERSHIPS_SUBSCRIPTION_STOP_SUCCESS ]: ( state, { subscriptionId } ) => ( {
		...state,
		[ subscriptionId ]: 'success',
	} ),
	[ MEMBERSHIPS_SUBSCRIPTION_STOP_FAILURE ]: ( state, { subscriptionId } ) => ( {
		...state,
		[ subscriptionId ]: 'fail',
	} ),
} );

export default combineReducers( {
	items,
	requesting,
	stoppingSubscription,
} );
