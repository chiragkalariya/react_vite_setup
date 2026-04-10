import Icone from "../assets/MainIcon";

export const sidebarItems = [
  {
    icon: Icone.customer,
    hoverIcon: Icone.customer_hover,
    title: "Customer",
    path: "/dashboard/customer",
  },
  {
    icon: Icone.customer_order,
    hoverIcon: Icone.customer_order_hover,
    title: "Customer Order",
    path: "/dashboard/customerorder",
  },
  {
    icon: Icone.daily_stock_taking,
    hoverIcon: Icone.daily_stock_taking_hover,
    title: "Daily Stock Taking",
    path: "/dashboard/dailystocktaking",
  },
  {
    icon: Icone.daily_stock_taking,
    hoverIcon: Icone.daily_stock_taking_hover,
    title: "Weekly Stock Taking",
    path: "/dashboard/weekstocktaking",
  },
  // {
  //   icon: Icone.estimation,
  //   hoverIcon: Icone.estimation_hover,
  //   title: "Estimation",
  //   path: "/dashboard/estimation",
  // },
  {
    icon: Icone.estimation,
    hoverIcon: Icone.estimation_hover,
    title: "Estimation",
    path: "/dashboard/newestimationview",
  },
  {
    icon: Icone.edit_bom,
    hoverIcon: Icone.edit_bom_hover,
    title: "Edit BOM Details",
    path: "/dashboard/newestimation",
  },
  {
    icon: Icone.invoice,
    hoverIcon: Icone.invoice_hover,
    title: "Invoice",
    path: "/dashboard/invoice",
  },
  {
    icon: Icone.return_icon,
    hoverIcon: Icone.return_icon_hover,
    title: "Return",
    path: "/dashboard/return",
  },
  {
    icon: Icone.exchange,
    hoverIcon: Icone.exchange_hover,
    title: "Exchange",
    path: "/dashboard/exchange",
  },
  {
    icon: Icone.buyback,
    hoverIcon: Icone.buyback_hover,
    title: "BuyBack",
    path: "/dashboard/buyback",
  },
  {
    icon: Icone.receipt,
    hoverIcon: Icone.receipt_hover,
    title: "Goods Receipt Note In",
    path: "/dashboard/goodsreceiptnote",
  },
  {
    icon: Icone.receipt,
    hoverIcon: Icone.receipt_hover,
    title: "Goods Receipt Note Out",
    path: "/dashboard/goodsreceiptnoteout",
  },
  {
    icon: Icone.urd_purchase,
    hoverIcon: Icone.urd_purchase_hover,
    title: "Old Gold Purchase",
    path: "/dashboard/urdpurchase",
  },
  {
    icon: Icone.today_gold_rate,
    hoverIcon: Icone.today_gold_rate_hover,
    title: "Today's Gold Rate",
    path: "/dashboard/todaysgoldrate",  
    isVisible: () => localStorage.getItem("type_of_company") === "9",
  },
  {
    icon: Icone.receipt,
    hoverIcon: Icone.receipt_hover,
    title: "Receipt",
    path: "/dashboard/receipt",
  },
  {
    icon: Icone.return_icon,
    hoverIcon: Icone.return_icon_hover,
    title: "Payment",
    path: "/dashboard/paymentreturn",
  },
  {
    icon: Icone.enrollement,
    hoverIcon: Icone.enrollement_hover,
    title: "Enrollment",
    path: "/dashboard/enrollment",
  },
  // {
  //   icon: Icone.order,
  //   hoverIcon: Icone.order_hover,
  //   title: "Order",
  //   path: "/dashboard/order",
  // },
  {
    icon: Icone.payment,
    hoverIcon: Icone.payment_hover,
    title: "Mode of Payment",
    path: "/dashboard/modeofpayment",
  },
  // {
  //   icon: Icone.payment,
  //   hoverIcon: Icone.payment_hover,
  //   title: "Payment",
  //   path: "/dashboard/payment",
  // },
  {
    icon: Icone.pos_master,
    hoverIcon: Icone.pos_master_hover,
    title: "POS Master",
    path: "/dashboard/posmaster",
  },
  // {
  //   icon: Icone.sales,
  //   hoverIcon: Icone.sales_hover,
  //   title: "Sales",
  //   path: "/dashboard/sales",
  // },

  // {
  //   icon: Icone.enrollement,
  //   hoverIcon: Icone.enrollement_hover,
  //   title: "Reminder of Installments",
  //   path: "/dashboard/schemereminderreport",
  // },

  // {
  //   icon: Icone.daily_stock_taking,
  //   hoverIcon: Icone.daily_stock_taking_hover,
  //   title: "Stock Report",
  //   path: "/dashboard/stocktrackingreport",
  // },

  {
    icon: Icone.reports,
    hoverIcon: Icone.reports_hover,
    title: "Reports",
    path: "/dashboard/reports/schemereminderreport",
    children: [
      {
        icon: Icone.reminder_of_installment,
        hoverIcon: Icone.reminder_of_installment_hover,
        title: "Reminder of Installments",
        path: "/dashboard/reports/schemereminderreport",
      },
      {
        icon: Icone.stock_report,
        hoverIcon: Icone.stock_report_hover,
        title: "Stock Report",
        path: "/dashboard/reports/stocktrackingreport",
      },
      {
        icon: Icone.statement_of_kohira_coins, 
        hoverIcon: Icone.statement_of_kohira_coins_hover,
        title: "Statement of Kohira Coins",
        path: "/dashboard/reports/statementofkohiracoins",
      },
    ],
  },

  {
    icon: Icone.customer_feedback,
    hoverIcon: Icone.customer_feedback_hover,
    title: "Customer Feedback",
    path: "/dashboard/customerfeedback",
  },

  // {
  //   icon: Icone.blog,
  //   title: "User Management",
  //   path: "/dashboard/user",
  //   children: [
  //     {
  //       title: "Group Four",
  //       path: "/user",
  //     },
  //     {
  //       title: "Group Five",
  //       path: "/user",
  //     },
  //     {
  //       title: "Group Six",
  //       path: "/user",
  //     },
  //   ],
  // },
];
