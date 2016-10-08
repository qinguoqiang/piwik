/*!
 * Piwik - free/libre analytics platform
 *
 * ViewDataTable screenshot tests.
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

describe("SegmentedVisitorLogTest", function () {
    this.retries(3);

    this.timeout(0);

    it('should load the segmented visitor log correctly when a segment is selected', function (done) {

        expect.screenshot("segmented_visitorlog").to.be.skippedOnAbort();

        var url = "?module=CoreHome&action=index&idSite=1&period=year&date=2012-01-13#?category=General_Visitors&subcategory=CustomVariables_CustomVariables&idSite=1&period=year&date=2012-01-13";
        expect.page(url).contains('.ui-dialog > .ui-dialog-content > div.dataTableVizVisitorLog:visible', 'segmented_visitorlog', function (page) {
            page.wait(1000);
            page.click('.segmentationTitle');
            page.wait(500);
            page.click('.segname:contains(From Europe)');
            page.wait(500);
            page.mouseMove('table.dataTable tbody tr:first-child');
            page.wait(500);
            page.mouseMove('a.actionSegmentVisitorLog:visible'); // necessary to get popover to display
            page.wait(500);
            page.click('a.actionSegmentVisitorLog:visible');
            page.wait(1000);

        }, done);
    });

    it('should not apply current segmented when opening visitor log', function (done) {

        var url = "?" + widgetizeParams + "&" + generalParams + "&moduleToWidgetize=Live&actionToWidgetize=getVisitorLog&segment=visitCount==2&enableAnimation=0";

        delete testEnvironment.queryParamOverride.visitorId;
        testEnvironment.save();

        expect.screenshot("visitor_profile_not_segmented").to.be.similar(0.002).to.capture(function (page) {
            page.load(url);

            page.evaluate(function () {
                $('.visitor-log-visitor-profile-link').first().click();
            });

            page.wait(1000);
        }, done);
    });


});
