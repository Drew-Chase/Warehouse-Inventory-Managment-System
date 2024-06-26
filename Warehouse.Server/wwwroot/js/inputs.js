import { search } from "./fuzzy-search.js";
const selectors = $(".selector");
const selectorOptions = $(".selector .selector-option");
selectorOptions.on("click", e => {
    const target = $(e.target);
    const parent = target.parent().parent();
    target.attr("selected", "");
    const value = target.attr("value");
    parent.attr("value", value !== null && value !== void 0 ? value : "");
    parent.trigger("change", { value });
    parent.trigger("blur");
});
selectors.on("change", (e, data) => {
    if (data == null)
        return;
    const target = $(e.target);
    const value = data.value;
    const name = target.find(".name").text();
    const selected = target.find("[selected]");
    selected.removeAttr("selected");
    const option = target.find(`[value="${value}"]`);
    option.attr("selected", "");
    target.find('.name').text(option.text());
});
selectors.find("input").on('keyup', e => {
    const target = $(e.target);
    const query = target.val();
    const parent = target.parent();
    const options = parent.find('.selector-option');
    if (query == "") {
        options.show();
        return;
    }
    const visibleOptions = search(query, options.map((i, el) => $(el).text()).toArray())
        .map((item) => parent.find(`.selector-option:contains(${item})`));
    options.hide();
    visibleOptions.forEach((option) => option.show());
}).on('blur', e => {
    const target = $(e.target);
    const parent = target.parent().parent();
    if (e.relatedTarget == null || !$(e.relatedTarget).is(parent)) {
        parent.removeClass("active");
        target.val('');
        target.parent().find('.selector-option').show();
    }
});
selectors.on("focus", e => {
    const target = $(e.target);
    target.addClass("active");
    if (target.find('input').length != 0)
        target.find('input').trigger("focus");
});
selectors.on('blur', e => {
    if (e.relatedTarget != null) {
        const relatedTarget = $(e.relatedTarget);
        if (relatedTarget.parent().parent().is(e.target))
            return;
    }
    const target = $(e.target);
    target.removeClass("active");
    target.find("input").val("");
    target.find(".selector-option").show();
});
$(".expandable-filter").on("click", e => {
    const target = $(e.target);
    const current = $(e.currentTarget);
    if (target.hasClass("name"))
        current.toggleClass("active");
});
//# sourceMappingURL=inputs.js.map