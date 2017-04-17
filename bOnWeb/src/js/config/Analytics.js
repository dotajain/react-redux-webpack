const analytics = {
	excludeViewContext: ['/user/experience/lifecycle'],
	channelID: 'WEB',
	sendInterval: 20000,
	defaultBankID: 'CB',

	// Analytics Name
	analytics_name_saving_goal_account_list : 'goalaccountlist',
	analytics_name_landing : 'landingscreen',
	analytics_name_add_alert : 'addalert',
	analytics_name_alerts : 'alerts',
	analytics_name_add_payee : 'addpayee',
	analytics_name_payee_list : 'payeelist',
	analytics_name_account_benefits : 'accountbenefits',
	analytics_name_account_summary : 'accountsummary',
	analytics_name_bos_budget : 'bosbudget',
	analytics_name_bos_month : 'bosmonth',
	analytics_name_budget : 'budget',
	analytics_name_budget_income : 'budgetincome',
	analytics_name_cash_withdrawal_story : 'financialstoriescashwithdrawals',
	analytics_name_in_and_out_story : 'financialstoriesinsandouts',
	analytics_name_micro_transaction_story : 'financialstoriesmicrotransactions',
	analytics_name_projections_story : 'financialstoriesprojections',
	analytics_name_contact_details : 'contactdetails',
	analytics_name_dashboard : 'dashboard',
	analytics_name_demo : 'demoactivity',
	analytics_name_enrolment : 'enrolment',
	analytics_name_faqs : 'faqs',
	analytics_name_help_centre : 'helpcentre',
	analytics_name_help_view : 'helpview',
	analytics_name_insight : 'insight',
	analytics_name_login : 'loginscreen',
	analytics_name_manage_payee : 'managepayee',
	analytics_name_manage_payees : 'managepayees',
	analytics_name_manage_payments : 'managepayments',
	analytics_name_phablet_payments : 'phabletpayment',
	analytics_name_payments_confirmation : 'paymentsconfirmation',
	analytics_name_payment_fail_message : 'paymentfailmessage',
	analytics_name_transaction_complete : 'transactioncomplete',
	analytics_name_transaction_done : 'transactiondone',
	analytics_name_transfers : 'transfers',
	analytics_name_nba : 'nba',
	analytics_name_pots_transfer : 'potstransfer',
	analytics_name_projections : 'projections',
	analytics_name_projections_prefs : 'projectionssettingsreview',
	analytics_name_projections_prefs_alerts : 'projectionsnavigatetoalerts',
	analytics_name_projections_prefs_spending : 'projectionsnavigatetospend',
	analytics_name_projection_alerts : 'projectionalerts',
	analytics_name_projections_bucket_view : 'projectionsbucketview',
	analytics_name_projections_bucket_detail : 'projectionsbucketdetail',
	analytics_name_saving_goal_list : 'goallist',
	analytics_name_saving_goal_create : 'goalcreation',
	analytics_name_saving_goal_edit : 'goalediting',
	analytics_name_saving_goal_adjust : 'goalrebalancing',
	analytics_name_saving_goal_viewer : 'goaldetails',
	analytics_name_search_single_account : 'searchsingleaccount',
	analytics_name_search_timeline : 'searchtimeline',
	analytics_name_security_prompt : 'securityprompt',
	analytics_name_spend : 'spend',
	analytics_name_spend_view_transaction_tag : 'spendviewtransactiontag',
	analytics_name_tag_editor : 'categories',
	analytics_name_update_alert : 'updatealert',

	// Analytics Event Method
	analytics_event_method_started : 'started',
	analytics_event_method_closed : 'closed',
	analytics_event_method_activated : 'activated',
	analytics_event_method_deactivated : 'deactivated',
	analytics_event_method_appeared : 'appeared',
	analytics_event_method_disappeared : 'disappeared',
	analytics_event_method_interacted : 'interacted',
	analytics_event_method_crashed : 'crashed',
	analytics_event_method_cta : 'cta',

	// Analytics Context Strings
	analytics_experience_view : '/user/experience/view',
	analytics_experience_activity : '/user/experience/activity',

	// Analytics Map Strings mapping key are not changed to lowercase
	analytics_map_stacktrace : 'stacktrace',
	analytics_map_error_id : 'error_id',
	analytics_map_client_error : 'client_error',
	analytics_map_view_context : 'ViewContext',

	analytics_utils_map_offer_id : 'OfferId',
	analytics_utils_map_impression_id : 'ImpressionId',
	analytics_utils_map_behaviour : 'Behaviour',
	analytics_utils_map_channel_id : 'ChannelId',
	analytics_utils_map_context_path : 'Context',
	analytics_utils_insight : '/insight',

	// Analytics Behaviour
	analytics_behaviour_positive : 'POSITIVE-ACCEPTED',
	analytics_behaviour_negative : 'NEGATIVE-DECLINED',
	analytics_behaviour_neutral : 'NEUTRAL-REMINDLATER',

	// Analytics Actions
	analytics_action_projections_demo_back : 'demoback',
	analytics_action_projections_demo_complete : 'democomplete',
	analytics_action_projections_threshold_change : 'thresholdchange',
	analytics_action_projections_danger_period_opt_in : 'dangerperiodoptin',
	analytics_action_projections_save_settings : 'savesettings',
	analytics_action_projections_danger_period_opt_out : 'dangerperiodoptout',
	analytics_action_projections_settings_review : 'settingsreview',
	analytics_action_projections_add_essential_spend_tags : 'addessentialspendtags',
	analytics_action_projections_remove_essential_spend_tags : 'removeessentialspendtags',
	analytics_action_projections_out_of_app_alerts_in : 'outofappalertsin',
	analytics_action_projections_out_of_app_alerts_out : 'outofappalertsout',
	analytics_action_projections_earnings_transaction_toggle : 'earningstransactiontoggle',

	analytics_action_alerts_projections_threshold_change : 'projections/thresholdChange',
	analytics_action_alerts_projections_out_of_app_alerts_in : 'projections/outofappalertsin',
	analytics_action_alerts_projections_out_of_app_alerts_out : 'projections/outofappalertsout',
	analytics_action_alerts_cancel : 'cancel',
	analytics_action_alerts_clicked : 'clicked',

	analytics_action_search_single_account_search_transactions : 'searchtransactions',
	analytics_action_search_single_account_transaction_selected : 'transactionselected',
	analytics_action_search_single_account_sort_transactions : 'sorttransactions',
	analytics_action_search_single_account_filter_transactions : 'filtertransactions',

	analytics_action_tag_editor_archive_tag : 'archivetag',
	analytics_action_tag_editor_edit_tag_selected : 'edittagselected',
	analytics_action_tag_editor_rename_tag : 'renametag',
	analytics_action_tag_editor_assigned_new_tag : 'assignednewtag',

	analytics_action_transaction_done_payment_made : 'paymentmade',
	analytics_action_transaction_done_recurring_frequency_selected : 'recurringfrequencyselected',
	analytics_action_transaction_done_transfer_made : 'transfermade',

	analytics_action_budget_create_budget : 'createbudget',
	analytics_action_budget_create_budget_complete : 'createbudgetcomplete',
	analytics_action_budget_edit_budget : 'editbudget',
	analytics_action_budget_edit_budget_complete : 'editbudgetcomplete',

	analytics_action_budget_income_apply : 'applybudgetincome',

	analytics_action_saving_goal_edit_cancel_edit_goal : 'canceleditgoal',
	analytics_action_saving_goal_edit_edit_goal : 'editgoal',
	analytics_action_saving_goal_create_create_goal : 'creategoal',

	analytics_action_spend_filter_by_account : 'filterbyaccount',
	analytics_action_spend_view_transaction_tag : 'viewtransactiontag',

	analytics_action_security_prompt_declined : 'declined',
	analytics_action_security_prompt_accepted : 'accepted',

	analytics_action_account_summary_transaction_tagging : 'transactiontagging',
	analytics_action_account_summary_sort_transactions : 'sorttransactions',

	analytics_action_search_timeline_search_transactions : 'searchtransactions',

	analytics_action_login_login : 'login',

	analytics_action_saving_goal_adjust_delete_goal : 'deletegoal',

	analytics_action_saving_goal_list_go_to_payments : 'gotopayments',

	analytics_action_add_payee_new_contact_created : 'newcontactcreated',

	analytics_action_saving_goal_viewer_delete_goal : 'deletegoal',

	analytics_action_micro_transaction_story_filter_transactions : 'filtertransactions',

	analytics_action_apply_budget_income : 'applybudgetincome',
	analytics_action_bos_budget : 'bosbudget',
	analytics_action_bos_month : 'bosmonth',

	analytics_action_low_balance_on : 'lowbalanceon',

	analytics_action_amendment_made : 'amendmentmade',

};

module.exports = analytics;
