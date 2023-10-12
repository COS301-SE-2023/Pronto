const createSubject = (announcement) => {
  return {
    Charset: "UTF-8",
    Data: `${announcement.course.coursecode} New Announcement: ${announcement.title}`,
  };
};

const createHtmlPart = (announcement) => {
  const body = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta charset="UTF-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    
    <style type="text/css">
    #outlook a {
        padding: 0;
    }
    .es-button {
        mso-style-priority: 100!important;
        text-decoration: none!important;
    }
    a[x-apple-data-detectors] {
        color: inherit!important;
        text-decoration: none!important;
        font-size: inherit!important;
        font-family: inherit!important;
        font-weight: inherit!important;
        line-height: inherit!important;
    }
    .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
    }
    @media only screen and (max-width: 600px) {
        p, ul li, ol li, a {
            line-height: 150%!important
        }
        h1, h2, h3, h1 a, h2 a, h3 a {
        }
        h1 {
            font-size: 30px!important;
            text-align: lefttwit
        }
        h2 {
            font-size: 24px!important;
            text-align: left
        }
        h3 {
            text-align: left
        }
        .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {
            font-size: 30px!important;
            text-align: left
        }
        .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {
            font-size: 24px!important;
            text-align: left
        }
        .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
            font-size: 20px!important;
            text-align: left
        }
        .es-menu td a {
            font-size: 14px!important
        }
        .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a {
            font-size: 14px!important
        }
        .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a {
            font-size: 14px!important
        }
        .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a {
            font-size: 14px!important
        }
        .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a {
            font-size: 12px!important
        }
        *[class="gmail-fix"] {
            display: none!important
        }
        .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 {
            text-align: center!important
        }
        .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 {
            text-align: right!important
        }
        .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 {
            text-align: left!important
        }
        .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img {
            display: inline!important
        }
        .es-button-border {
            display: inline-block!important
        }
        a.es-button, button.es-button {
            font-size: 18px!important;
            display: inline-block!important
        }
        .es-adaptive table, .es-left, .es-right {
            width: 100%!important
        }
        .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header {
            width: 100%!important;
            max-width: 600px!important
        }
        .es-adapt-td {
            display: block!important;
            width: 100%!important
        }
        .adapt-img {
            width: 100%!important;
            height: auto!important
        }
        .es-m-p0 {
            padding: 0px!important
        }
        .es-m-p0r {
            padding-right: 0px!important
        }
        .es-m-p0l {
            padding-left: 0px!important
        }
        .es-m-p0t {
            padding-top: 0px!important
        }
        .es-m-p0b {
            padding-bottom: 0!important
        }
        .es-m-p20b {
            padding-bottom: 20px!important
        }
        .es-mobile-hidden, .es-hidden {
            display: none!important
        }
        tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden {
            width: auto!important;
            overflow: visible!important;
            float: none!important;
            max-height: inherit!important;
            line-height: inherit!important
        }
        tr.es-desk-hidden {
            display: table-row!important
        }
        table.es-desk-hidden {
            display: table!important
        }
        td.es-desk-menu-hidden {
            display: table-cell!important
        }
        .es-menu td {
            width: 1%!important
        }
        table.es-table-not-adapt, .esd-block-html table {
            width: auto!important
        }
        table.es-social {
            display: inline-block!important
        }
        table.es-social td {
            display: inline-block!important
        }
        .es-desk-hidden {
            display: table-row!important;
            width: auto!important;
            overflow: visible!important;
            max-height: inherit!important
        }
    }
  line-height: 120%
  font-size: 20px!important;
</style>
</head>
<body style="width: 100%; font-family: arial, 'helvetica neue', helvetica, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0; margin: 0;">

  <div class="es-wrapper-color" style="background-color:#F6F6F6">
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
    <tr>
    <td valign="top" style="padding:0;Margin:0">
    <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr>
    <td align="center" style="padding:0;Margin:0">
    <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
    <tr>
    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="left" style="padding:0;Margin:0;width:560px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr class="es-visible-simple-html-only">
    <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://szonqb.stripocdn.email/content/guids/b33a6e7d-d15b-43f6-8d45-c54f00e09844/images/prontologo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="534"></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr>
    <td align="center" style="padding:0;Margin:0">
    <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
    <tr>
    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr class="es-visible-simple-html-only">
    <td class="es-container-visible-simple-html-only" valign="top" align="center" style="padding:0;Margin:0;width:560px">
    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:27px;color:#000000;font-size:18px"><strong>${announcement.course.coursecode} New ${announcement.type}</strong></p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr>
    <td align="center" style="padding:0;Margin:0">
    <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
    <tr>
    <td class="esdev-adapt-off" align="left" style="padding:20px;Margin:0">
    <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
    <tr>
    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
    <table cellspacing="0" cellpadding="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
    <tr class="es-visible-simple-html-only">
    <td class="es-container-visible-simple-html-only" align="left" style="padding:0;Margin:0;width:275px">
    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#333333;font-size:16px">${announcement.title}</p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    <td style="padding:0;Margin:0;width:10px"></td>
    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
    <tr>
    <td align="left" style="padding:0;Margin:0;width:275px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr class="es-visible-simple-html-only">
    <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#333333;font-size:16px;text-align:right">SCHEDULE:\n Day: ${announcement.date}\n: Start: ${announcement.start}\n End: ${announcement.end} </p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    <tr>
    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr class="es-visible-simple-html-only">
    <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${announcement.body}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    <tr class="es-visible-simple-html-only">
    <td class="es-struct-html esdev-adapt-off" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="left" style="padding:0;Margin:0;width:560px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Date Posted: ${announcement.createdAt}</p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    <tr>
    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr class="es-visible-simple-html-only">
    <td align="center" style="padding:0;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:#3a3a3a;background:#e32f45;border-width:0px 0px 2px 0px;display:inline-block;border-radius:20px;width:200px;"><a href="" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:14px;padding:15px 30px;display:inline-block;background:#e32f45;border-radius:20px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:17px;width:auto;text-align:center;mso-padding-alt:0;mso-border-alt:10px solid #31CB4B">View More</a></span></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    <tr>
    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr class="es-visible-simple-html-only">
    <td align="center" style="padding:20px;Margin:0;font-size:0">
    <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td style="padding:0;Margin:0;border-bottom:4px solid #e32f45;background:unset;height:1px;width:100%;margin:0px"></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    </div>

</body>
</html>
`;
  return {
    Charset: "UTF-8",
    Data: body,
  };
};

const createTextPart = (announcement) => {
  const body = `${announcement.course.coursecode} New ${announcement.type}`;
  return {
    Charset: "UTF-8",
    Data: body,
  };
};

module.exports = {
  createSubject,
  createHtmlPart,
  createTextPart,
};
