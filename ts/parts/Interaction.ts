/* *
 *
 *  (c) 2010-2019 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

import H from './Globals.js';

/**
 * Internal types
 * @private
 */
declare global {
    namespace Highcharts {
        interface Chart {
            resetZoomButton?: SVGElement;
            pan(e: PointerEventObject, panning: string): void;
            showResetZoom(): void;
            zoom(event: SelectEventObject): void;
            zoomOut(): void;
        }
        interface Legend {
            createCheckboxForItem(item: (BubbleLegend|Point|Series)): void;
            setItemEvents(
                item: (BubbleLegend|Point|Series),
                legendItem: SVGElement,
                useHTML?: boolean
            ): void;
        }
        interface Point {
            className?: string;
            events?: SeriesEventsOptions;
            hasImportedEvents?: boolean;
            selected?: boolean;
            selectedStaging?: boolean;
            state?: string;
            haloPath(size: number): SVGElement;
            importEvents(): void;
            onMouseOut(): void;
            onMouseOver(e: PointerEventObject): void;
            select(selected?: boolean, accumulate?: boolean): void;
            setState(
                state?: string,
                move?: boolean
            ): void;
        }
        interface PointEventsOptionsObject {
            select?: PointSelectCallbackFunction;
            unselect?: PointUnselectCallbackFunction;
        }
        interface PointInteractionEventObject extends Event {
            accumulate: boolean;
        }
        interface PointSelectCallbackFunction {
            (this: Point, event: PointInteractionEventObject): void;
        }
        interface PointUnselectCallbackFunction {
            (this: Point, event: PointInteractionEventObject): void;
        }
        interface Series {
            _hasTracking?: boolean;
            halo?: SVGElement;
            stateMarkerGraphic?: SVGElement;
            tracker?: SVGElement;
            trackerGroups?: Array<string>;
            drawTracker: (
                TrackerMixin['drawTrackerGraph']|
                TrackerMixin['drawTrackerPoint']
            );
            hide(): void;
            onMouseOut(): void;
            onMouseOver(): void;
            select(selected?: boolean): void;
            setAllPointsToState(state?: string): void;
            setState(state?: string, inherit?: boolean): void;
            setVisible(visible?: boolean, redraw?: boolean): void;
            show(): void;
        }
        interface TrackerMixin {
            drawTrackerGraph(this: Highcharts.Series): void;
            drawTrackerPoint(this: Series): void;
        }
        let TrackerMixin: TrackerMixin;
    }
}

/**
 * @interface Highcharts.PointEventsOptionsObject
 *//**
 * Fires when the point is selected either programmatically or following a click
 * on the point. One parameter, `event`, is passed to the function. Returning
 * `false` cancels the operation.
 * @name Highcharts.PointEventsOptionsObject#select
 * @type {Highcharts.PointSelectCallbackFunction}
 *//**
 * Fires when the point is unselected either programmatically or following a
 * click on the point. One parameter, `event`, is passed to the function.
 * Returning `false` cancels the operation.
 * @name Highcharts.PointEventsOptionsObject#unselect
 * @type {Highcharts.PointUnselectCallbackFunction}
 */

/**
 * Information about the select/unselect event.
 *
 * @interface Highcharts.PointInteractionEventObject
 * @extends global.Event
 *//**
 * @name Highcharts.PointInteractionEventObject#accumulate
 * @type {boolean}
 */

/**
 * Gets fired when the point is selected either programmatically or following a
 * click on the point.
 *
 * @callback Highcharts.PointSelectCallbackFunction
 *
 * @param {Highcharts.Point} this
 *        Point where the event occured.
 *
 * @param {Highcharts.PointInteractionEventObject} event
 *        Event that occured.
 */

/**
 * Fires when the point is unselected either programmatically or following a
 * click on the point.
 *
 * @callback Highcharts.PointUnselectCallbackFunction
 *
 * @param {Highcharts.Point} this
 *        Point where the event occured.
 *
 * @param {Highcharts.PointInteractionEventObject} event
 *        Event that occured.
 */

import U from './Utilities.js';
const {
    defined,
    isArray,
    isObject,
    objectEach
} = U;

import './Chart.js';
import './Options.js';
import './Legend.js';
import './Point.js';
import './Series.js';

var addEvent = H.addEvent,
    Chart = H.Chart,
    createElement = H.createElement,
    css = H.css,
    defaultOptions = H.defaultOptions,
    defaultPlotOptions = H.defaultPlotOptions,
    extend = H.extend,
    fireEvent = H.fireEvent,
    hasTouch = H.hasTouch,
    Legend = H.Legend,
    merge = H.merge,
    pick = H.pick,
    Point = H.Point,
    Series = H.Series,
    seriesTypes = H.seriesTypes,
    svg = H.svg,
    TrackerMixin;

/* eslint-disable valid-jsdoc */

/**
 * TrackerMixin for points and graphs.
 *
 * @private
 * @mixin Highcharts.TrackerMixin
 */
TrackerMixin = H.TrackerMixin = {

    /**
     * Draw the tracker for a point.
     *
     * @private
     * @function Highcharts.TrackerMixin.drawTrackerPoint
     * @param {Highcharts.Series} this
     * @return {void}
     * @fires Highcharts.Series#event:afterDrawTracker
     */
    drawTrackerPoint: function (this: Highcharts.Series): void {
        var series = this,
            chart = series.chart,
            pointer = chart.pointer,
            onMouseOver = function (e: Highcharts.PointerEventObject): void {
                var point = pointer.getPointFromEvent(e);

                // undefined on graph in scatterchart
                if (point !== undefined) {
                    pointer.isDirectTouch = true;
                    point.onMouseOver(e);
                }
            },
            dataLabels;

        // Add reference to the point
        series.points.forEach(function (point: Highcharts.Point): void {
            dataLabels = (
                isArray(point.dataLabels) ?
                    point.dataLabels :
                    (point.dataLabel ? [point.dataLabel] : [])
            );

            if (point.graphic) {
                (point.graphic.element as any).point = point;
            }
            (dataLabels as any).forEach(function (
                dataLabel: Highcharts.SVGElement
            ): void {
                if (dataLabel.div) {
                    dataLabel.div.point = point;
                } else {
                    (dataLabel.element as any).point = point;
                }
            });
        });

        // Add the event listeners, we need to do this only once
        if (!series._hasTracking) {
            (series.trackerGroups as any).forEach(function (key: string): void {
                if ((series as any)[key]) {
                    // we don't always have dataLabelsGroup
                    (series as any)[key]
                        .addClass('highcharts-tracker')
                        .on('mouseover', onMouseOver)
                        .on('mouseout', function (
                            e: Highcharts.PointerEventObject
                        ): void {
                            pointer.onTrackerMouseOut(e);
                        });
                    if (hasTouch) {
                        (series as any)[key].on('touchstart', onMouseOver);
                    }

                    if (!chart.styledMode && series.options.cursor) {
                        (series as any)[key]
                            .css(css)
                            .css({ cursor: series.options.cursor });
                    }
                }
            });
            series._hasTracking = true;
        }

        fireEvent(this, 'afterDrawTracker');
    },

    /**
     * Draw the tracker object that sits above all data labels and markers to
     * track mouse events on the graph or points. For the line type charts
     * the tracker uses the same graphPath, but with a greater stroke width
     * for better control.
     *
     * @private
     * @function Highcharts.TrackerMixin.drawTrackerGraph
     * @param {Highcharts.Series} this
     * @return {void}
     * @fires Highcharts.Series#event:afterDrawTracker
     */
    drawTrackerGraph: function (this: Highcharts.Series): void {
        var series = this,
            options = series.options,
            trackByArea =
                (options as Highcharts.AreaRangeSeriesOptions).trackByArea,
            trackerPath = ([] as Highcharts.SVGPathArray).concat(
                trackByArea ?
                    ((series as Highcharts.AreaSeries).areaPath as any) :
                    (series.graphPath as any)
            ),
            trackerPathLength = trackerPath.length,
            chart = series.chart,
            pointer = chart.pointer,
            renderer = chart.renderer,
            snap = (chart.options.tooltip as any).snap,
            tracker = series.tracker,
            i,
            onMouseOver = function (): void {
                if (chart.hoverSeries !== series) {
                    (series as any).onMouseOver();
                }
            },
            /*
             * Empirical lowest possible opacities for TRACKER_FILL for an
             * element to stay invisible but clickable
             * IE6: 0.002
             * IE7: 0.002
             * IE8: 0.002
             * IE9: 0.00000000001 (unlimited)
             * IE10: 0.0001 (exporting only)
             * FF: 0.00000000001 (unlimited)
             * Chrome: 0.000001
             * Safari: 0.000001
             * Opera: 0.00000000001 (unlimited)
             */
            TRACKER_FILL = 'rgba(192,192,192,' + (svg ? 0.0001 : 0.002) + ')';

        // Extend end points. A better way would be to use round linecaps,
        // but those are not clickable in VML.
        if (trackerPathLength && !trackByArea) {
            i = trackerPathLength + 1;
            while (i--) {
                if ((trackerPath[i] as any) === 'M' as any) {
                    // extend left side
                    trackerPath.splice(
                        i + 1, 0,
                        (trackerPath[i + 1] as any) - snap,
                        trackerPath[i + 2],
                        'L'
                    );
                }
                if ((i && (trackerPath[i] as any) === 'M') ||
                    i === trackerPathLength
                ) {
                    // extend right side
                    trackerPath.splice(
                        i,
                        0,
                        'L',
                        trackerPath[i - 2] + snap,
                        trackerPath[i - 1]
                    );
                }
            }
        }

        // draw the tracker
        if (tracker) {
            tracker.attr({ d: trackerPath });
        } else if (series.graph) { // create

            series.tracker = renderer.path(trackerPath)
                .attr({
                    visibility: series.visible ? 'visible' : 'hidden',
                    zIndex: 2
                })
                .addClass(
                    trackByArea ?
                        'highcharts-tracker-area' :
                        'highcharts-tracker-line'
                )
                .add(series.group);

            if (!chart.styledMode) {
                (series.tracker as any).attr({
                    'stroke-linejoin': 'round', // #1225
                    stroke: TRACKER_FILL,
                    fill: trackByArea ? TRACKER_FILL : 'none',
                    'stroke-width': series.graph.strokeWidth() +
                        (trackByArea ? 0 : 2 * snap)
                });
            }

            // The tracker is added to the series group, which is clipped, but
            // is covered by the marker group. So the marker group also needs to
            // capture events.
            [series.tracker, series.markerGroup].forEach(function (
                tracker: (Highcharts.SVGElement|undefined)
            ): void {
                (tracker as any).addClass('highcharts-tracker')
                    .on('mouseover', onMouseOver)
                    .on('mouseout', function (
                        e: Highcharts.PointerEventObject
                    ): void {
                        pointer.onTrackerMouseOut(e);
                    });

                if (options.cursor && !chart.styledMode) {
                    (tracker as any).css({ cursor: options.cursor });
                }

                if (hasTouch) {
                    (tracker as any).on('touchstart', onMouseOver);
                }
            });
        }
        fireEvent(this, 'afterDrawTracker');
    }
};
/* End TrackerMixin */


// Add tracking event listener to the series group, so the point graphics
// themselves act as trackers

if (seriesTypes.column) {
    /**
     * @private
     * @borrows Highcharts.TrackerMixin.drawTrackerPoint as Highcharts.seriesTypes.column#drawTracker
     */
    seriesTypes.column.prototype.drawTracker = TrackerMixin.drawTrackerPoint;
}

if (seriesTypes.pie) {
    /**
     * @private
     * @borrows Highcharts.TrackerMixin.drawTrackerPoint as Highcharts.seriesTypes.pie#drawTracker
     */
    seriesTypes.pie.prototype.drawTracker = TrackerMixin.drawTrackerPoint;
}

if (seriesTypes.scatter) {
    /**
     * @private
     * @borrows Highcharts.TrackerMixin.drawTrackerPoint as Highcharts.seriesTypes.scatter#drawTracker
     */
    seriesTypes.scatter.prototype.drawTracker = TrackerMixin.drawTrackerPoint;
}

// Extend Legend for item events.
extend(Legend.prototype, {

    /**
     * @private
     * @function Highcharts.Legend#setItemEvents
     * @param {Highcharts.BubbleLegend|Highcharts.Point|Highcharts.Series} item
     * @param {Highcharts.SVGElement} legendItem
     * @param {boolean} [useHTML=false]
     * @return {void}
     * @fires Highcharts.Point#event:legendItemClick
     * @fires Highcharts.Series#event:legendItemClick
     */
    setItemEvents: function (
        this: Highcharts.Legend,
        item: (Highcharts.BubbleLegend|Highcharts.Point|Highcharts.Series),
        legendItem: Highcharts.SVGElement,
        useHTML?: boolean
    ): void {
        var legend = this,
            boxWrapper = legend.chart.renderer.boxWrapper,
            isPoint = item instanceof Point,
            activeClass = 'highcharts-legend-' +
                (isPoint ? 'point' : 'series') + '-active',
            styledMode = legend.chart.styledMode;

        // Set the events on the item group, or in case of useHTML, the item
        // itself (#1249)
        (useHTML ? legendItem : (item.legendGroup as any))
            .on('mouseover', function (): void {

                if (item.visible) {
                    legend.allItems.forEach(function (
                        inactiveItem: (
                            Highcharts.BubbleLegend|Highcharts.Point|
                            Highcharts.Series
                        )
                    ): void {
                        if (item !== inactiveItem) {
                            inactiveItem.setState('inactive', !isPoint);
                        }
                    });
                }

                item.setState('hover');

                // A CSS class to dim or hide other than the hovered series.
                // Works only if hovered series is visible (#10071).
                if (item.visible) {
                    boxWrapper.addClass(activeClass);
                }

                if (!styledMode) {
                    legendItem.css(
                        legend.options.itemHoverStyle as Highcharts.CSSObject
                    );
                }
            })
            .on('mouseout', function (): void {
                if (!legend.chart.styledMode) {
                    legendItem.css(
                        merge(
                            item.visible ?
                                legend.itemStyle as Highcharts.CSSObject :
                                legend.itemHiddenStyle as Highcharts.CSSObject
                        )
                    );
                }

                legend.allItems.forEach(function (
                    inactiveItem: (
                        Highcharts.BubbleLegend|Highcharts.Point|
                        Highcharts.Series
                    )
                ): void {
                    if (item !== inactiveItem) {
                        inactiveItem.setState('', !isPoint);
                    }
                });

                // A CSS class to dim or hide other than the hovered series
                boxWrapper.removeClass(activeClass);

                item.setState();
            })
            .on('click', function (event: Highcharts.PointerEventObject): void {
                var strLegendItemClick = 'legendItemClick',
                    fnLegendItemClick = function (): void {
                        if ((item as any).setVisible) {
                            (item as any).setVisible();
                        }
                        // Reset inactive state
                        legend.allItems.forEach(function (
                            inactiveItem: (
                                Highcharts.BubbleLegend|Highcharts.Point|
                                Highcharts.Series
                            )
                        ): void {
                            if (item !== inactiveItem) {
                                inactiveItem.setState(
                                    item.visible ? 'inactive' : '',
                                    !isPoint
                                );
                            }
                        });
                    };

                // A CSS class to dim or hide other than the hovered series.
                // Event handling in iOS causes the activeClass to be added
                // prior to click in some cases (#7418).
                boxWrapper.removeClass(activeClass);

                // Pass over the click/touch event. #4.
                event = {
                    browserEvent: event
                } as any;

                // click the name or symbol
                if ((item as any).firePointEvent) { // point
                    (item as any).firePointEvent(
                        strLegendItemClick,
                        event,
                        fnLegendItemClick
                    );
                } else {
                    fireEvent(
                        item, strLegendItemClick, event, fnLegendItemClick
                    );
                }
            });
    },

    /**
     * @private
     * @function Highcharts.Legend#createCheckboxForItem
     * @param {Highcharts.BubbleLegend|Highcharts.Point|Highcharts.Series} item
     * @return {void}
     * @fires Highcharts.Series#event:checkboxClick
     */
    createCheckboxForItem: function (
        this: Highcharts.Legend,
        item: (Highcharts.BubbleLegend|Highcharts.Point|Highcharts.Series)
    ): void {
        var legend = this;

        item.checkbox = createElement('input', {
            type: 'checkbox',
            className: 'highcharts-legend-checkbox',
            checked: (item as any).selected,
            defaultChecked: (item as any).selected // required by IE7
        }, legend.options.itemCheckboxStyle, legend.chart.container) as any;

        addEvent(item.checkbox, 'click', function (
            event: Highcharts.PointerEventObject
        ): void {
            var target = event.target as Highcharts.LegendCheckBoxElement;

            fireEvent(
                (item as any).series || item,
                'checkboxClick',
                { // #3712
                    checked: target.checked,
                    item: item
                },
                function (): void {
                    (item as any).select();
                }
            );
        });
    }
});

// Extend the Chart object with interaction
extend(Chart.prototype, /** @lends Chart.prototype */ {

    /**
     * Display the zoom button.
     *
     * @private
     * @function Highcharts.Chart#showResetZoom
     * @return {void}
     * @fires Highcharts.Chart#event:beforeShowResetZoom
     */
    showResetZoom: function (this: Highcharts.Chart): void {
        var chart = this,
            lang = defaultOptions.lang,
            btnOptions = (chart.options.chart as any).resetZoomButton,
            theme = btnOptions.theme,
            states = theme.states,
            alignTo = (
                btnOptions.relativeTo === 'chart' ||
                btnOptions.relativeTo === 'spaceBox' ?
                    null :
                    'plotBox'
            );

        /**
         * @private
         */
        function zoomOut(): void {
            chart.zoomOut();
        }

        fireEvent(this, 'beforeShowResetZoom', null as any, function (): void {
            chart.resetZoomButton = chart.renderer
                .button(
                    (lang as any).resetZoom,
                    null as any,
                    null as any,
                    zoomOut,
                    theme,
                    states && states.hover
                )
                .attr({
                    align: btnOptions.position.align,
                    title: (lang as any).resetZoomTitle
                })
                .addClass('highcharts-reset-zoom')
                .add()
                .align(btnOptions.position, false, alignTo as any);
        });

        fireEvent(this, 'afterShowResetZoom');
    },

    /**
     * Zoom the chart out after a user has zoomed in. See also
     * [Axis.setExtremes](/class-reference/Highcharts.Axis#setExtremes).
     *
     * @function Highcharts.Chart#zoomOut
     * @return {void}
     * @fires Highcharts.Chart#event:selection
     */
    zoomOut: function (this: Highcharts.Chart): void {
        fireEvent(this, 'selection', { resetSelection: true }, this.zoom);
    },

    /**
     * Zoom into a given portion of the chart given by axis coordinates.
     *
     * @private
     * @function Highcharts.Chart#zoom
     * @param {Highcharts.SelectEventObject} event
     * @return {void}
     */
    zoom: function (
        this: Highcharts.Chart,
        event: Highcharts.SelectEventObject
    ): void {
        var chart = this,
            hasZoomed,
            pointer = chart.pointer,
            displayButton = false,
            mouseDownPos =
                chart.inverted ? pointer.mouseDownX : pointer.mouseDownY,
            resetZoomButton;

        // If zoom is called with no arguments, reset the axes
        if (!event || (event as any).resetSelection) {
            chart.axes.forEach(function (axis: Highcharts.Axis): void {
                hasZoomed = (axis.zoom as any)();
            });
            pointer.initiated = false; // #6804

        } else { // else, zoom in on all axes
            event.xAxis.concat(event.yAxis).forEach(function (
                axisData: Highcharts.SelectDataObject
            ): void {
                var axis = axisData.axis,
                    axisStartPos = chart.inverted ? axis.left : axis.top,
                    axisEndPos = chart.inverted ?
                        axisStartPos + axis.width : axisStartPos + axis.height,
                    isXAxis = axis.isXAxis,
                    isWithinPane = false;

                // Check if zoomed area is within the pane (#1289).
                // In case of multiple panes only one pane should be zoomed.
                if (
                    (!isXAxis &&
                    mouseDownPos >= axisStartPos &&
                    mouseDownPos <= axisEndPos) ||
                    isXAxis ||
                    !defined(mouseDownPos)
                ) {
                    isWithinPane = true;
                }

                // don't zoom more than minRange
                if (pointer[isXAxis ? 'zoomX' : 'zoomY'] && isWithinPane) {
                    hasZoomed = axis.zoom(axisData.min, axisData.max);
                    if (axis.displayBtn) {
                        displayButton = true;
                    }
                }
            });
        }

        // Show or hide the Reset zoom button
        resetZoomButton = chart.resetZoomButton;
        if (displayButton && !resetZoomButton) {
            chart.showResetZoom();
        } else if (!displayButton && isObject(resetZoomButton)) {
            chart.resetZoomButton = (resetZoomButton as any).destroy();
        }


        // Redraw
        if (hasZoomed) {
            chart.redraw(
                pick(
                    (chart.options.chart as any).animation,
                    event && (event as any).animation,
                    chart.pointCount < 100
                )
            );
        }
    },

    /**
     * Pan the chart by dragging the mouse across the pane. This function is
     * called on mouse move, and the distance to pan is computed from chartX
     * compared to the first chartX position in the dragging operation.
     *
     * @private
     * @function Highcharts.Chart#pan
     * @param {Highcharts.PointerEventObject} e
     * @param {string} panning
     * @return {void}
     */
    pan: function (
        this: Highcharts.Chart,
        e: Highcharts.PointerEventObject,
        panning: string
    ): void {

        var chart = this,
            hoverPoints = chart.hoverPoints,
            doRedraw: boolean;

        fireEvent(this, 'pan', { originalEvent: e }, function (): void {

            // remove active points for shared tooltip
            if (hoverPoints) {
                hoverPoints.forEach(function (point: Highcharts.Point): void {
                    point.setState();
                });
            }

            // xy is used in maps
            (panning === 'xy' ? [1, 0] : [1]).forEach(function (
                isX: number
            ): void {
                var axis = chart[isX ? 'xAxis' : 'yAxis'][0],
                    horiz = axis.horiz,
                    mousePos = e[horiz ? 'chartX' : 'chartY'],
                    mouseDown = horiz ? 'mouseDownX' : 'mouseDownY',
                    startPos = (chart as any)[mouseDown],
                    halfPointRange = (axis.pointRange || 0) / 2,
                    pointRangeDirection =
                        (axis.reversed && !chart.inverted) ||
                        (!axis.reversed && chart.inverted) ?
                            -1 :
                            1,
                    extremes = axis.getExtremes(),
                    panMin = axis.toValue(startPos - mousePos, true) +
                        halfPointRange * pointRangeDirection,
                    panMax =
                        axis.toValue(
                            startPos + axis.len - mousePos, true
                        ) -
                        halfPointRange * pointRangeDirection,
                    flipped = panMax < panMin,
                    newMin = flipped ? panMax : panMin,
                    newMax = flipped ? panMin : panMax,
                    paddedMin = Math.min(
                        extremes.dataMin,
                        halfPointRange ?
                            extremes.min :
                            axis.toValue(
                                axis.toPixels(extremes.min) -
                                axis.minPixelPadding
                            )
                    ),
                    paddedMax = Math.max(
                        extremes.dataMax,
                        halfPointRange ?
                            extremes.max :
                            axis.toValue(
                                axis.toPixels(extremes.max) +
                                axis.minPixelPadding
                            )
                    ),
                    spill;

                // If the new range spills over, either to the min or max,
                // adjust the new range.
                spill = paddedMin - newMin;
                if (spill > 0) {
                    newMax += spill;
                    newMin = paddedMin;
                }
                spill = newMax - paddedMax;
                if (spill > 0) {
                    newMax = paddedMax;
                    newMin -= spill;
                }

                // Set new extremes if they are actually new
                if (
                    axis.series.length &&
                    newMin !== extremes.min &&
                    newMax !== extremes.max
                ) {
                    axis.setExtremes(
                        newMin,
                        newMax,
                        false,
                        false,
                        { trigger: 'pan' }
                    );
                    doRedraw = true;
                }

                // set new reference for next run:
                (chart as any)[mouseDown] = mousePos;
            });

            if (doRedraw) {
                chart.redraw(false);
            }
            css(chart.container, { cursor: 'move' });
        });
    }
});

// Extend the Point object with interaction
extend(Point.prototype, /** @lends Highcharts.Point.prototype */ {

    /**
     * Toggle the selection status of a point.
     *
     * @see Highcharts.Chart#getSelectedPoints
     *
     * @sample highcharts/members/point-select/
     *         Select a point from a button
     * @sample highcharts/chart/events-selection-points/
     *         Select a range of points through a drag selection
     * @sample maps/series/data-id/
     *         Select a point in Highmaps
     *
     * @function Highcharts.Point#select
     *
     * @param {boolean} [selected]
     *        When `true`, the point is selected. When `false`, the point is
     *        unselected. When `null` or `undefined`, the selection state is
     *        toggled.
     *
     * @param {boolean} [accumulate=false]
     *        When `true`, the selection is added to other selected points.
     *        When `false`, other selected points are deselected. Internally in
     *        Highcharts, when
     *        [allowPointSelect](http://api.highcharts.com/highcharts/plotOptions.series.allowPointSelect)
     *        is `true`, selected points are accumulated on Control, Shift or
     *        Cmd clicking the point.
     *
     * @return {void}
     *
     * @fires Highcharts.Point#event:select
     * @fires Highcharts.Point#event:unselect
     */
    select: function (
        this: Highcharts.Point,
        selected?: boolean,
        accumulate?: boolean
    ): void {
        var point = this,
            series = point.series,
            chart = series.chart;

        selected = pick(selected, !point.selected);

        this.selectedStaging = selected;

        // fire the event with the default handler
        point.firePointEvent(
            selected ? 'select' : 'unselect',
            { accumulate: accumulate },
            function (): void {

                /**
                 * Whether the point is selected or not.
                 *
                 * @see Point#select
                 * @see Chart#getSelectedPoints
                 *
                 * @name Highcharts.Point#selected
                 * @type {boolean}
                 */
                point.selected = point.options.selected = selected;
                (series.options.data as any)[series.data.indexOf(point)] =
                    point.options;

                point.setState((selected as any) && 'select');

                // unselect all other points unless Ctrl or Cmd + click
                if (!accumulate) {
                    chart.getSelectedPoints().forEach(function (
                        loopPoint: Highcharts.Point
                    ): void {
                        var loopSeries = loopPoint.series;

                        if (loopPoint.selected && loopPoint !== point) {
                            loopPoint.selected = loopPoint.options.selected =
                                false;
                            (loopSeries.options.data as any)[
                                loopSeries.data.indexOf(loopPoint)
                            ] = loopPoint.options;

                            // Programatically selecting a point should restore
                            // normal state, but when click happened on other
                            // point, set inactive state to match other points
                            loopPoint.setState(
                                chart.hoverPoints &&
                                    loopSeries.options.inactiveOtherPoints ?
                                    'inactive' : ''
                            );
                            loopPoint.firePointEvent('unselect');
                        }
                    });
                }
            }
        );

        delete this.selectedStaging;
    },

    /**
     * Runs on mouse over the point. Called internally from mouse and touch
     * events.
     *
     * @function Highcharts.Point#onMouseOver
     *
     * @param {Highcharts.PointerEventObject} e
     *        The event arguments.
     *
     * @return {void}
     */
    onMouseOver: function (
        this: Highcharts.Point,
        e: Highcharts.PointerEventObject
    ): void {
        var point = this,
            series = point.series,
            chart = series.chart,
            pointer = chart.pointer;

        e = e ?
            pointer.normalize(e) :
            // In cases where onMouseOver is called directly without an event
            pointer.getChartCoordinatesFromPoint(point, chart.inverted) as any;
        pointer.runPointActions(e, point);
    },

    /**
     * Runs on mouse out from the point. Called internally from mouse and touch
     * events.
     *
     * @function Highcharts.Point#onMouseOut
     * @return {void}
     * @fires Highcharts.Point#event:mouseOut
     */
    onMouseOut: function (this: Highcharts.Point): void {
        var point = this,
            chart = point.series.chart;

        point.firePointEvent('mouseOut');

        if (!point.series.options.inactiveOtherPoints) {
            (chart.hoverPoints || []).forEach(function (
                p: Highcharts.Point
            ): void {
                p.setState();
            });
        }

        chart.hoverPoints = chart.hoverPoint = null as any;
    },

    /**
     * Import events from the series' and point's options. Only do it on
     * demand, to save processing time on hovering.
     *
     * @private
     * @function Highcharts.Point#importEvents
     * @return {void}
     */
    importEvents: function (this: Highcharts.Point): void {
        if (!this.hasImportedEvents) {
            var point = this,
                options = merge(
                    point.series.options.point,
                    point.options
                ) as Highcharts.SeriesOptionsType,
                events = options.events;

            point.events = events;

            objectEach(events, function (
                event: Function,
                eventType: string
            ): void {
                if (H.isFunction(event)) {
                    addEvent(point, eventType, event);
                }
            });
            this.hasImportedEvents = true;

        }
    },

    /**
     * Set the point's state.
     *
     * @function Highcharts.Point#setState
     *
     * @param {string} [state]
     *        The new state, can be one of `''` (an empty string), `hover`,
     *        `select` or `inactive`.
     * @param {boolean} [move]
     *        State for animation.
     *
     * @fires Highcharts.Point#event:afterSetState
     */
    setState: function (
        this: Highcharts.Point,
        state?: string,
        move?: boolean
    ): void {
        var point = this,
            series = point.series,
            previousState = point.state,
            stateOptions = (
                (series.options.states as any)[state || 'normal'] ||
                {}
            ),
            markerOptions = (
                (defaultPlotOptions as any)[series.type as any].marker &&
                series.options.marker
            ),
            normalDisabled = (markerOptions && markerOptions.enabled === false),
            markerStateOptions = ((
                markerOptions &&
                markerOptions.states &&
                (markerOptions.states as any)[state || 'normal']
            ) || {}),
            stateDisabled = (markerStateOptions as any).enabled === false,
            stateMarkerGraphic = series.stateMarkerGraphic,
            pointMarker = point.marker || {},
            chart = series.chart,
            halo = series.halo,
            haloOptions,
            markerAttribs,
            pointAttribs: Highcharts.SVGAttributes,
            pointAttribsAnimation: Highcharts.AnimationOptionsObject,
            hasMarkers = (markerOptions && series.markerAttribs),
            newSymbol;

        state = state || ''; // empty string

        if (
            // already has this state
            (state === point.state && !move) ||

            // selected points don't respond to hover
            (point.selected && state !== 'select') ||

            // series' state options is disabled
            (stateOptions.enabled === false) ||

            // general point marker's state options is disabled
            (state && (
                stateDisabled ||
                (normalDisabled &&
                (markerStateOptions as any).enabled === false)
            )) ||

            // individual point marker's state options is disabled
            (
                state &&
                pointMarker.states &&
                (pointMarker.states as any)[state] &&
                (pointMarker.states as any)[state].enabled === false
            ) // #1610

        ) {
            return;
        }

        point.state = state;

        if (hasMarkers) {
            markerAttribs = series.markerAttribs(point, state);
        }

        // Apply hover styles to the existing point
        if (point.graphic) {

            if (previousState) {
                point.graphic.removeClass('highcharts-point-' + previousState);
            }
            if (state) {
                point.graphic.addClass('highcharts-point-' + state);
            }

            if (!chart.styledMode) {
                pointAttribs = series.pointAttribs(point, state);
                pointAttribsAnimation = pick(
                    (chart.options.chart as any).animation,
                    stateOptions.animation
                );

                // Some inactive points (e.g. slices in pie) should apply
                // oppacity also for it's labels
                if (series.options.inactiveOtherPoints) {
                    (point.dataLabels || []).forEach(function (
                        label: Highcharts.SVGElement
                    ): void {
                        if (label) {
                            label.animate(
                                {
                                    opacity: pointAttribs.opacity
                                },
                                pointAttribsAnimation
                            );
                        }
                    });

                    if (point.connector) {
                        point.connector.animate(
                            {
                                opacity: pointAttribs.opacity
                            },
                            pointAttribsAnimation
                        );
                    }
                }

                point.graphic.animate(
                    pointAttribs,
                    pointAttribsAnimation
                );
            }

            if (markerAttribs) {
                point.graphic.animate(
                    markerAttribs,
                    pick(
                        // Turn off globally:
                        (chart.options.chart as any).animation,
                        (markerStateOptions as any).animation,
                        (markerOptions as any).animation
                    )
                );
            }

            // Zooming in from a range with no markers to a range with markers
            if (stateMarkerGraphic) {
                stateMarkerGraphic.hide();
            }
        } else {
            // if a graphic is not applied to each point in the normal state,
            // create a shared graphic for the hover state
            if (state && markerStateOptions) {
                newSymbol = pointMarker.symbol || series.symbol;

                // If the point has another symbol than the previous one, throw
                // away the state marker graphic and force a new one (#1459)
                if (stateMarkerGraphic &&
                    stateMarkerGraphic.currentSymbol !== newSymbol
                ) {
                    stateMarkerGraphic = stateMarkerGraphic.destroy();
                }

                // Add a new state marker graphic
                if (markerAttribs) {
                    if (!stateMarkerGraphic) {
                        if (newSymbol) {
                            series.stateMarkerGraphic = stateMarkerGraphic =
                                chart.renderer
                                    .symbol(
                                        newSymbol,
                                        markerAttribs.x,
                                        markerAttribs.y,
                                        markerAttribs.width,
                                        markerAttribs.height
                                    )
                                    .add(series.markerGroup);
                            stateMarkerGraphic.currentSymbol = newSymbol;
                        }

                    // Move the existing graphic
                    } else {
                        stateMarkerGraphic[move ? 'animate' : 'attr']({ // #1054
                            x: markerAttribs.x,
                            y: markerAttribs.y
                        });
                    }
                }

                if (!chart.styledMode && stateMarkerGraphic) {
                    stateMarkerGraphic.attr(series.pointAttribs(point, state));
                }
            }

            if (stateMarkerGraphic) {
                stateMarkerGraphic[
                    state && point.isInside ? 'show' : 'hide'
                ](); // #2450
                (stateMarkerGraphic.element as any).point = point; // #4310
            }
        }

        // Show me your halo
        haloOptions = stateOptions.halo;
        const markerGraphic = (point.graphic || stateMarkerGraphic);
        const markerVisibility = (
            markerGraphic && markerGraphic.visibility || 'inherit'
        );

        if (haloOptions && haloOptions.size && markerVisibility !== 'hidden') {
            if (!halo) {
                series.halo = halo = chart.renderer.path()
                    // #5818, #5903, #6705
                    .add((markerGraphic as any).parentGroup);
            }
            halo.show()[move ? 'animate' : 'attr']({
                d: point.haloPath(haloOptions.size) as any
            });
            halo.attr({
                'class': 'highcharts-halo highcharts-color-' +
                    pick(point.colorIndex, series.colorIndex) +
                    (point.className ? ' ' + point.className : ''),
                'visibility': markerVisibility,
                'zIndex': -1 // #4929, #8276
            });
            halo.point = point; // #6055

            if (!chart.styledMode) {
                halo.attr(extend(
                    {
                        'fill': point.color || series.color,
                        'fill-opacity': haloOptions.opacity
                    } as Highcharts.SVGAttributes,
                    haloOptions.attributes
                ));
            }

        } else if (halo && halo.point && halo.point.haloPath) {
            // Animate back to 0 on the current halo point (#6055)
            halo.animate(
                { d: halo.point.haloPath(0) },
                null as any,
                // Hide after unhovering. The `complete` callback runs in the
                // halo's context (#7681).
                halo.hide
            );
        }

        fireEvent(point, 'afterSetState');
    },

    /**
     * Get the path definition for the halo, which is usually a shadow-like
     * circle around the currently hovered point.
     *
     * @function Highcharts.Point#haloPath
     *
     * @param {number} size
     *        The radius of the circular halo.
     *
     * @return {Highcharts.SVGElement}
     *         The path definition.
     */
    haloPath: function (
        this: Highcharts.Point,
        size: number
    ): Highcharts.SVGElement {
        var series = this.series,
            chart = series.chart;

        return chart.renderer.symbols.circle(
            Math.floor(this.plotX as any) - size,
            (this.plotY as any) - size,
            size * 2,
            size * 2
        );
    }
});

// Extend the Series object with interaction
extend(Series.prototype, /** @lends Highcharts.Series.prototype */ {

    /**
     * Runs on mouse over the series graphical items.
     *
     * @function Highcharts.Series#onMouseOver
     * @return {void}
     * @fires Highcharts.Series#event:mouseOver
     */
    onMouseOver: function (this: Highcharts.Series): void {
        var series = this,
            chart = series.chart,
            hoverSeries = chart.hoverSeries;

        // set normal state to previous series
        if (hoverSeries && hoverSeries !== series) {
            hoverSeries.onMouseOut();
        }

        // trigger the event, but to save processing time,
        // only if defined
        if ((series.options.events as any).mouseOver) {
            fireEvent(series, 'mouseOver');
        }

        // hover this
        series.setState('hover');

        /**
         * Contains the original hovered series.
         *
         * @name Highcharts.Chart#hoverSeries
         * @type {Highcharts.Series|null}
         */
        chart.hoverSeries = series;
    },

    /**
     * Runs on mouse out of the series graphical items.
     *
     * @function Highcharts.Series#onMouseOut
     *
     * @fires Highcharts.Series#event:mouseOut
     */
    onMouseOut: function (this: Highcharts.Series): void {
        // trigger the event only if listeners exist
        var series = this,
            options = series.options,
            chart = series.chart,
            tooltip = chart.tooltip,
            hoverPoint = chart.hoverPoint;

        // #182, set to null before the mouseOut event fires
        chart.hoverSeries = null as any;

        // trigger mouse out on the point, which must be in this series
        if (hoverPoint) {
            hoverPoint.onMouseOut();
        }

        // fire the mouse out event
        if (series && (options.events as any).mouseOut) {
            fireEvent(series, 'mouseOut');
        }


        // hide the tooltip
        if (
            tooltip &&
            !series.stickyTracking &&
            (!tooltip.shared || series.noSharedTooltip)
        ) {
            tooltip.hide();
        }

        // Reset all inactive states
        chart.series.forEach(function (s: Highcharts.Series): void {
            s.setState('', true);
        });

    },

    /**
     * Set the state of the series. Called internally on mouse interaction
     * operations, but it can also be called directly to visually
     * highlight a series.
     *
     * @function Highcharts.Series#setState
     *
     * @param {string} [state]
     *        Can be either `hover` or undefined to set to normal state.
     * @param {boolean} [inherit]
     *        Determines if state should be inherited by points too.
     */
    setState: function (
        this: Highcharts.Series,
        state?: string,
        inherit?: boolean
    ): void {
        var series = this,
            options = series.options,
            graph = series.graph,
            inactiveOtherPoints = options.inactiveOtherPoints,
            stateOptions = options.states,
            lineWidth = options.lineWidth,
            opacity = options.opacity,
            // By default a quick animation to hover/inactive,
            // slower to un-hover
            stateAnimation = pick(
                (
                    (stateOptions as any)[state || 'normal'] &&
                    (stateOptions as any)[state || 'normal'].animation
                ),
                (series.chart.options.chart as any).animation
            ),
            attribs,
            i = 0;

        state = state || '';

        if (series.state !== state) {

            // Toggle class names
            [
                series.group,
                series.markerGroup,
                series.dataLabelsGroup
            ].forEach(function (
                group: (Highcharts.SVGElement|undefined)
            ): void {
                if (group) {
                    // Old state
                    if (series.state) {
                        group.removeClass('highcharts-series-' + series.state);
                    }
                    // New state
                    if (state) {
                        group.addClass('highcharts-series-' + state);
                    }
                }
            });

            series.state = state;

            if (!series.chart.styledMode) {

                if ((stateOptions as any)[state] &&
                    (stateOptions as any)[state].enabled === false
                ) {
                    return;
                }

                if (state) {
                    lineWidth = (
                        (stateOptions as any)[state].lineWidth ||
                        lineWidth + (
                            (stateOptions as any)[state].lineWidthPlus || 0
                        )
                    ); // #4035
                    opacity = pick(
                        (stateOptions as any)[state].opacity,
                        opacity
                    );
                }

                if (graph && !graph.dashstyle) {
                    attribs = {
                        'stroke-width': lineWidth
                    };

                    // Animate the graph stroke-width.
                    graph.animate(
                        attribs,
                        stateAnimation
                    );
                    while ((series as any)['zone-graph-' + i]) {
                        (series as any)['zone-graph-' + i].attr(attribs);
                        i = i + 1;
                    }
                }

                // For some types (pie, networkgraph, sankey) opacity is
                // resolved on a point level
                if (!inactiveOtherPoints) {
                    [
                        series.group,
                        series.markerGroup,
                        series.dataLabelsGroup,
                        series.labelBySeries
                    ].forEach(
                        function (group: Highcharts.SVGElement): void {
                            if (group) {
                                group.animate(
                                    {
                                        opacity: opacity
                                    },
                                    stateAnimation
                                );
                            }
                        }
                    );
                }
            }
        }

        // Don't loop over points on a series that doesn't apply inactive state
        // to siblings markers (e.g. line, column)
        if (inherit && inactiveOtherPoints && series.points) {
            series.setAllPointsToState(state);
        }
    },

    /**
     * Set the state for all points in the series.
     *
     * @function Highcharts.Series#setAllPointsToState
     *
     * @private
     *
     * @param {string} [state]
     *        Can be either `hover` or undefined to set to normal state.
     */
    setAllPointsToState: function (
        this: Highcharts.Series,
        state?: string
    ): void {
        this.points.forEach(function (point: Highcharts.Point): void {
            if (point.setState) {
                point.setState(state);
            }
        });
    },

    /**
     * Show or hide the series.
     *
     * @function Highcharts.Series#setVisible
     *
     * @param {boolean} [visible]
     *        True to show the series, false to hide. If undefined, the
     *        visibility is toggled.
     *
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart after the series is altered. If doing
     *        more operations on the chart, it is a good idea to set redraw to
     *        false and call {@link Chart#redraw|chart.redraw()} after.
     *
     * @return {void}
     *
     * @fires Highcharts.Series#event:hide
     * @fires Highcharts.Series#event:show
     */
    setVisible: function (
        this: Highcharts.Series,
        vis?: boolean,
        redraw?: boolean
    ): void {
        var series = this,
            chart = series.chart,
            legendItem = series.legendItem,
            showOrHide: ('hide'|'show'),
            ignoreHiddenSeries =
                (chart.options.chart as any).ignoreHiddenSeries,
            oldVisibility = series.visible;

        // if called without an argument, toggle visibility
        series.visible =
            vis =
            series.options.visible =
            series.userOptions.visible =
            vis === undefined ? !oldVisibility : vis; // #5618
        showOrHide = vis ? 'show' : 'hide';

        // show or hide elements
        [
            'group',
            'dataLabelsGroup',
            'markerGroup',
            'tracker',
            'tt'
        ].forEach(function (key: string): void {
            if ((series as any)[key]) {
                (series as any)[key][showOrHide]();
            }
        });


        // hide tooltip (#1361)
        if (
            chart.hoverSeries === series ||
            (chart.hoverPoint && chart.hoverPoint.series) === series
        ) {
            series.onMouseOut();
        }


        if (legendItem) {
            chart.legend.colorizeItem(series, vis);
        }


        // rescale or adapt to resized chart
        series.isDirty = true;
        // in a stack, all other series are affected
        if (series.options.stacking) {
            chart.series.forEach(function (
                otherSeries: Highcharts.Series
            ): void {
                if (otherSeries.options.stacking && otherSeries.visible) {
                    otherSeries.isDirty = true;
                }
            });
        }

        // show or hide linked series
        series.linkedSeries.forEach(function (
            otherSeries: Highcharts.Series
        ): void {
            otherSeries.setVisible(vis, false);
        });

        if (ignoreHiddenSeries) {
            chart.isDirtyBox = true;
        }

        fireEvent(series, showOrHide);

        if (redraw !== false) {
            chart.redraw();
        }
    },

    /**
     * Show the series if hidden.
     *
     * @sample highcharts/members/series-hide/
     *         Toggle visibility from a button
     *
     * @function Highcharts.Series#show
     * @return {void}
     * @fires Highcharts.Series#event:show
     */
    show: function (this: Highcharts.Series): void {
        this.setVisible(true);
    },

    /**
     * Hide the series if visible. If the {@link
     * https://api.highcharts.com/highcharts/chart.ignoreHiddenSeries|
     * chart.ignoreHiddenSeries} option is true, the chart is redrawn without
     * this series.
     *
     * @sample highcharts/members/series-hide/
     *         Toggle visibility from a button
     *
     * @function Highcharts.Series#hide
     * @return {void}
     * @fires Highcharts.Series#event:hide
     */
    hide: function (this: Highcharts.Series): void {
        this.setVisible(false);
    },


    /**
     * Select or unselect the series. This means its
     * {@link Highcharts.Series.selected|selected}
     * property is set, the checkbox in the legend is toggled and when selected,
     * the series is returned by the
     * {@link Highcharts.Chart#getSelectedSeries}
     * function.
     *
     * @sample highcharts/members/series-select/
     *         Select a series from a button
     *
     * @function Highcharts.Series#select
     *
     * @param {boolean} [selected]
     *        True to select the series, false to unselect. If undefined, the
     *        selection state is toggled.
     *
     * @return {void}
     *
     * @fires Highcharts.Series#event:select
     * @fires Highcharts.Series#event:unselect
     */
    select: function (this: Highcharts.Series, selected?: boolean): void {
        var series = this;

        series.selected =
        selected =
        this.options.selected = (
            selected === undefined ?
                !series.selected :
                selected
        );

        if (series.checkbox) {
            series.checkbox.checked = selected;
        }

        fireEvent(series, selected ? 'select' : 'unselect');
    },

    /**
     * @private
     * @borrows Highcharts.TrackerMixin.drawTrackerGraph as Highcharts.Series#drawTracker
     */
    drawTracker: TrackerMixin.drawTrackerGraph
});
