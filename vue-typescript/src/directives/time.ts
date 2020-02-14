const Time: any = {
  // 获取当前时间戳
  getUnix(): number {
    const date = new Date();
    return date.getTime();
  },
  // 获取今天 0 点 0 分 0 秒的时间戳
  getTodayUnix() :number {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },

  // 获取今年 1 月 1 日 0 点 0 分 0 秒的时间戳
  getYearUnix(): number {
    const date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },

  // 获取标准年月日
  getLastDate(time: number) :string {
    const date = new Date(time);
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + day;

    // let value = date.toLocaleDateString();
    // return value.replace(/\//g, "-"); // 该设置限制在系统时间以斜杠分隔，有缺陷
  },

  // 转换时间
  getFormatTime(timestamp: number) : string {
    const now: number = this.getUnix();
    const today: number = this.getTodayUnix();
    const year = this.getYearUnix();

    const timer = (now - timestamp) / 1000; // 转换为妙级时间戳
    let tip = ""; // 使用 switch 语句里，无法读取 tip 遍历

    // switch (true) {
    //   case timer <= 0:
    //     tip = "刚刚";
    //     break;
    //   case timer < 3600:
    //     tip = Math.floor(timer / 60) + "分钟前";
    //     break;
    //   case timer >= 3600 && timestamp - today >= 0:
    //     tip = Math.floor(timer / 3600) + "小时前";
    //     break;
    //   case timer / 86400 <= 31:
    //     tip = Math.ceil(timer / 86400) + "天前";
    //     break;
    //   default:
    //     tip = this.getLastDate(timestamp);
    //     break;
    // }

    if (timer <= 0) {
      tip = "刚刚";
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + "分钟前";
    } else if (timer >= 3600 && timestamp - today >= 0) {
      tip = Math.floor(timer / 3600) + "小时前";
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + "天前";
    } else {
      tip = this.getLastDate(timestamp);
    }

    return tip;
  }
};

export default {
  bind: function(el: any, binding: any): void {
    el.innerHTML = Time.getFormatTime(binding.value);
    el.__timeout__ = setInterval(function() {
      el.innerHTML = Time.getFormatTime(binding.value);
    }, 60000);
  },
  unbind: function(el: any): void {
    clearInterval(el.__timeout__);
    delete el.__timeout__;
  }
};
